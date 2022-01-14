const router = require("express").Router()
const sequelize = require("../../config/connection")
const { Post, User, Comment } = require("../../models")
const withAuth = require("../../utils/auth")

// get all users
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "body", "created_at"],
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
    .then(dbPostData => res.status(200).json(dbPostData))
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "body", "created_at"],
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
        : res.status(200).json(dbPostData)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

router.post("/", withAuth, (req, res) => {
  // expects { title: String, body: String }
  Post.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id,
  })
    .then(dbPostData => res.status(200).json(dbPostData))
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

router.put("/:id", withAuth, (req, res) => {
  Post.update(
    { ...req.body, user_id: req.session.user_id },
    {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    }
  )
    .then(dbPostData => {
      return !dbPostData[0] > 0
        ? res.status(404).json({ message: "No post found with this id" })
        : res.status(200).json(dbPostData)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(dbPostData => {
      return !dbPostData
        ? res.status(404).json({ message: "No post found with this id" })
        : res.status(200).json(dbPostData)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

module.exports = router
