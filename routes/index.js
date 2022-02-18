const router = require("express").Router()
const {
  renderHome,
  renderLogin,
  renderPosts,
  renderSinglePost,
} = require("../controllers/html")

router.use("/api", require("./api"))

router.get("/", renderHome)
router.get("/login", renderLogin)
router.get("/posts", renderPosts)
router.get("/posts/:postId", renderSinglePost)

module.exports = router
