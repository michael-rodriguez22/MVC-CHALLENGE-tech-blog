const asyncHandler = require("express-async-handler")
const { User, Post } = require("../../models")
const { Op } = require("sequelize")

const hidePassword = ({ id, username, email }) => ({ id, username, email })

const handle404 = (resource = "user") => `No ${resource} was found with this id`

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

  const exists = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  })

  if (exists) {
    res.status(400)

    if (exists.username === username)
      throw new Error("This username is already in use")

    if (exists.email === email)
      throw new Error("This email address is already in use")
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

  const user = await User.findOne({ where: { email } })

  if (!user || !user.checkPassword(body.password)) {
    res.status(400)
    throw new Error("Incorrect login credentials")
  }

  const posts = await Post.findAll({ where: { user_id: user.id } })

  session.user = hidePassword(user)
  session.posts = posts
  session.loggedIn = true

  return res.status(200).json({ user: session.user, posts: session.posts })
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
  const user = await User.findByPk(session.user.id)

  if (!user) {
    res.status(404)
    session.destroy()
    throw new Error(handle404() + ", try logging in again")
  }

  const posts = await Post.findAll({ where: { user_id: user.id } })

  session.user = hidePassword(user)
  session.posts = posts

  return res.status(200).json({ user: session.user, posts: session.posts })
})

// @method  PUT
// @access  private
// @route   /api/users/me
// @desc    Update current user's info
const updateMe = asyncHandler(async ({ body, session }, res) => {
  const { username, email } = body
  if (!username && !email) {
    res.status(400)
    throw new Error("No update to email or username was provided")
  }

  const user = await User.findByPk(session.user.id)

  if (!user) {
    res.status(404)
    session.destroy()
    throw new Error(handle404() + ", try logging in again")
  }

  user.set({
    username: username || user.username,
    email: email || user.email,
  })

  await user.save()

  const posts = await Post.findAll({ where: { user_id: user.id } })

  session.user = hidePassword(user)
  session.posts = posts

  return res.status(200).json({ user: session.user, posts: session.posts })
})

module.exports = { registerUser, loginUser, logoutUser, getMe, updateMe }
