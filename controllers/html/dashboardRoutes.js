const router = require("express").Router()

router.get("/", (req, res) => res.render("dashboard", { loggedIn: true }))

module.exports = router
