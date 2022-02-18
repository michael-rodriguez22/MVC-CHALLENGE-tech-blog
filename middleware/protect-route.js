module.exports = ({ session, method, originalUrl }, res, next) => {
  if (!session.loggedIn) {
    res.status(400)
    throw new Error(`Must be logged in to ${method} ${originalUrl}`)
  }

  next()
}
