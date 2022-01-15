const router = require("express").Router()

router.get("/", (req, res) =>
  res.render("posts", {
    loggedIn: req.session.loggedIn,
  })
)

module.exports = router
