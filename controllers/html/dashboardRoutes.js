const router = require("express").Router()

router.get("/", (req, res) =>
  res.render("dashboard", {
    loggedIn: true,
    dashboard: true,
    username: req.session.username,
    email: req.session.email,
    sessionUserId: req.session.user_id,
  })
)

module.exports = router
