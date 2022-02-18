const router = require("express").Router()
const { renderHome, renderLogin } = require("../../controllers/html")

router.get("/", renderHome)
router.get("/login", renderLogin)

module.exports = router
