const router = require("express").Router()
const postRoutes = require("./postRoutes")
const dashboardRoutes = require("./dashboardRoutes")

router.get("/", (req, res) =>
  res.render("home", {
    loggedIn: req.session.loggedIn,
    landing: true,
    username: req.session.username,
  })
)

router.get("/login", (req, res) =>
  req.session.loggedIn ? res.redirect("/") : res.render("login")
)
router.put("/login", (req, res) =>
  req.session.loggedIn ? res.redirect("/") : res.render("login")
)
router.delete("/login", (req, res) =>
  req.session.loggedIn ? res.redirect("/") : res.render("login")
)

router.use("/posts", postRoutes)

router.use("/dashboard", dashboardRoutes)

module.exports = router
