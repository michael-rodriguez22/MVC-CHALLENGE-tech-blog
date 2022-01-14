const router = require("express").Router()

router.get("/", (req, res) => res.send("HOME"))

router.get("/login", (req, res) =>
  req.session.loggedIn ? res.redirect("/") : res.send("LOGIN")
)

router.put("/login", (req, res) =>
  req.session.loggedIn ? res.redirect("/") : res.send("LOGIN")
)

router.delete("/login", (req, res) =>
  req.session.loggedIn ? res.redirect("/") : res.send("LOGIN")
)

module.exports = router
