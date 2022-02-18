const router = require("express").Router()
const protect = require("../../middleware/protect-route")
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateMe,
} = require("../../controllers/api/user-controller")

router.post("/", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

router.route("/me").get(protect, getMe).put(protect, updateMe)

module.exports = router
