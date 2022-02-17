module.exports = (req, res, next) => {
  // check if user is logged in
  if (!req.session.loggedIn) {
    res.redirect("/login")
  } else {
    next()
  }
}
