const renderHome = ({ session }, res) => {
  res.render("home", { session, landing: true })
}

const renderLogin = ({ session }, res) => {
  session.loggedIn ? res.redirect("/") : res.render("login")
}

module.exports = { renderHome, renderLogin }
