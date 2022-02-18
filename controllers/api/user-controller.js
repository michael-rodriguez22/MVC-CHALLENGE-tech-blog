const asyncHandler = require("express-async-handler")
const { User, Post, Comment } = require("../../models")

const hidePassword = ({ dataValues }) => {
  const copy = {}

  for (let property in dataValues) {
    if (property !== "password") copy[property] = dataValues[property]
  }

  return copy
}

const handle404 = (resource = "user") => `No ${resource} was found with this id`

const includePosts = {
  model: Post,
  attributes: {
    exclude: ["user_id"],
  },
  include: {
    model: Comment,
    attributes: ["id"],
  },
}

// @method  POST
// @access  public
// @route   /api/users/
// @desc    Register new user and save user data to session
const registerUser = asyncHandler(async ({ body, session }, res) => {
  const { username, email, password } = body

  if (!username || !email || !password) {
    res.status(400)
    throw new Error("Username, email, and password are required")
  }

  const user = await User.create({ username, email, password })

  session.user = hidePassword(user)
  session.loggedIn = true

  return res.status(201).json(session.user)
})

// @method  POST
// @access  public
// @route   /api/users/login
// @desc    Login with email and password
const loginUser = asyncHandler(async ({ body, session }, res) => {
  const { email, password } = body

  if (!email || !password) {
    res.status(400)
    throw new Error("Email and password are required to login")
  }

  const user = await User.findOne({
    where: { email },
    include: includePosts,
  })

  if (!user || !user.checkPassword(password)) {
    res.status(400)
    throw new Error("Incorrect login credentials")
  }

  session.user = hidePassword(user)
  session.loggedIn = true

  return res.status(200).json(session.user)
})

// @method  POST
// @access  public
// @route   /api/users/logout
// @desc    Logout current user
const logoutUser = asyncHandler(async ({ session }, res) => {
  session.destroy()
  return res.status(204).end()
})

// @method  GET
// @access  private
// @route   /api/users/me
// @desc    Get current user info
const getMe = asyncHandler(async ({ session }, res) => {
  const user = await User.findByPk(session.user.id, {
    include: includePosts,
  })

  if (!user) {
    res.status(404)
    session.destroy()
    throw new Error(handle404() + ", try logging in again")
  }

  session.user = hidePassword(user)

  return res.status(200).json(session.user)
})

// @method  PUT
// @access  private
// @route   /api/users/me
// @desc    Update current user's info
const updateMe = asyncHandler(async ({ body, session }, res) => {
  const { currentPassword, username, email, newPassword } = body

  if (!username && !email && !newPassword) {
    res.status(400)
    throw new Error("No profile information was sent to be updated")
  }

  const user = await User.findByPk(session.user.id, {
    include: includePosts,
  })

  if (!user) {
    res.status(404)
    session.destroy()
    throw new Error(handle404() + ", try logging in again")
  }

  if (!user.checkPassword(currentPassword)) {
    res.status(400)
    throw new Error("Incorrect password")
  }

  if (username) user.username = username
  if (email) user.email = email
  if (newPassword) user.password = newPassword

  await user.save()

  session.user = hidePassword(user)

  return res.status(200).json(session.user)
})

module.exports = { registerUser, loginUser, logoutUser, getMe, updateMe }
