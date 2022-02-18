module.exports = ({ session, originalUrl }, res, next) => {
  if (!session.loggedIn) {
    res.status(400)
    throw new Error(`Must be logged in to access ${originalUrl}`)
  }

  next()
}
