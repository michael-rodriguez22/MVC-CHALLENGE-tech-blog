const router = require("express").Router()
const { Post, User, Comment } = require("../../models")

// render posts page
router.get("/", (req, res) => {
  const filter = posts => {
    if (req.query.author) {
      posts = posts.filter(post => post.user.username === req.query.author)
    }
    if (req.query.title) {
      posts = posts.filter(post => post.post_title.includes(req.query.title))
    }
    return posts
  }

  Post.findAll({
    attributes: ["id", "post_title", "post_body", "created_at"],
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
    console.log(filter(posts))
    res.render("posts", {
      posts: filter(posts),
      loggedIn: req.session.loggedIn,
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
  })
    .then(dbPostData => {
      return !dbPostData
        ? res.status(404).json({ message: "No post found with this id" })
        : res.render("single-post", {
            post: dbPostData.get({ plain: true }),
            loggedIn: req.session.loggedIn,
          })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

module.exports = router
