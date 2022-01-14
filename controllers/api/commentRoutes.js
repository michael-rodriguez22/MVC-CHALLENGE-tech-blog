const router = require("express").Router()
const { Comment } = require("../../models")
const withAuth = require("../../utils/auth")

router.get("/", (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

router.post("/", withAuth, (req, res) => {
  // expects => { comment_body: String, user_id: Number, post_id: Number }
  Comment.create({
    comment_body: req.body.comment_body,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err)
      return res.status(400).json({ message: "Bad request", err })
    })
})

router.put("/:id", withAuth, (req, res) => {
  Comment.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then(dbCommentData => {
      return !dbCommentData[0] > 0
        ? res
            .status(404)
            .json({ message: "No comment of yours found with this id" })
        : res.status(200).json(dbCommentData)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ message: "Bad request", err })
    })
})

router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then(dbCommentData => {
      return !dbCommentData
        ? res
            .status(404)
            .json({ message: "No comment of yours found with this id" })
        : res.status(200).json(dbCommentData)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

module.exports = router
