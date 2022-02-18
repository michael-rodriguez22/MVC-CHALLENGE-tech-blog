const router = require("express").Router()

router.use("/users", require("./user-routes"))
router.use("/posts", require("./post-routes"))

module.exports = router
