const router = require("express").Router()
const postRoutes = require("./postRoutes")
const dashboardRoutes = require("./dashboardRoutes")

router.get("/", (req, res) => res.render("home"))

router.get("/login", (req, res) =>
  req.session.loggedIn ? res.redirect("/") : res.render("login")
)
router.put("/login", (req, res) =>
  req.session.loggedIn ? res.redirect("/") : res.render("login")
)
router.delete("/login", (req, res) =>
  req.session.loggedIn ? res.redirect("/") : res.render("login")
)

router.get("/contact", (req, res) => res.render("contact"))

router.use("/posts", postRoutes)

router.use("/dashboard", dashboardRoutes)

module.exports = router
