const router = require("express").Router()
const { Post, User, Comment } = require("../../models")

// render posts page
router.get("/", (req, res) => {
  console.log("dog log", req.query.author, req.query.title)
  const filterPosts = posts => {
    if (req.query.author) {
      posts = posts.filter(post =>
        post.user.username.includes(req.query.author)
      )
    }
    if (req.query.title) {
      posts = posts.filter(post => post.post_title.includes(req.query.title))
    }
    return posts
  }

  Post.findAll({
    attributes: ["id", "post_title", "post_body", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_body", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }))
    res.render("posts", {
      posts: filterPosts(posts),
      loggedIn: req.session.loggedIn,
      message: () => {
        if (req.query.title === undefined && req.query.author === undefined) {
          return "Showing all posts"
        } else {
          return `Showing posts ${
            req.query.title ? `with a title of "${req.query.title}"` : ""
          } ${req.query.author ? `written by "${req.query.author}"` : ""}`
        }
      },
    })
  })
})

// render single post page
router.get("/:id", (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: ["id", "post_title", "post_body", "created_at"],
    include: [
      {
        model: Comment,
        order: [["created_at", "DESC"]],
        attributes: ["id", "comment_body", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username", "id"],
        },
      },
      {
        model: User,
        attributes: ["username", "id"],
      },
    ],
  })
    .then(dbPostData => {
      return !dbPostData
        ? res.status(404).json({ message: "No post found with this id" })
        : res.render("single-post", {
            post: dbPostData.get({ plain: true }),
            loggedIn: req.session.loggedIn,
            sessionUserId: req.session.user_id,
          })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

module.exports = router
