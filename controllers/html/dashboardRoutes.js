const router = require("express").Router()

router.get("/", (req, res) =>
  res.render("dashboard", {
    loggedIn: true,
    dashboard: true,
    username: req.session.username,
    sessionUserId: req.session.user_id,
  })
)

module.exports = router
