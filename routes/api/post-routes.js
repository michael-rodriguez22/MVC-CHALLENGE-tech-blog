const router = require("express").Router()
const protect = require("../../middleware/protect-route")
const {
  getPosts,
  createPost,
  getPostById,
  editPost,
  deletePost,
} = require("../../controllers/api/post-controller")

router.route("/").get(getPosts).post(protect, createPost)

router
  .route("/:id")
  .get(getPostById)
  .put(protect, editPost)
  .delete(protect, deletePost)

module.exports = router
