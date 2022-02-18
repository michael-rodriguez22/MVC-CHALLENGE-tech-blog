const router = require("express").Router()
const protect = require("../../middleware/protect-route")
const {
  createComment,
  editComment,
  deleteComment,
} = require("../../controllers/api/comment-controller")

router.post("/:postId", protect, createComment)

router
  .route("/:commentId")
  .put(protect, editComment)
  .delete(protect, deleteComment)

module.exports = router
