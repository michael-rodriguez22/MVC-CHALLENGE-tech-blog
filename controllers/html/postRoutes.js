const router = require("express").Router()
const { Post, User, Comment } = require("../../models")

router.get("/", (req, res) => {
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
    console.log(posts)
    res.render("posts", {
      posts,
      loggedIn: req.session.loggedIn,
    })
  })
})

module.exports = router
