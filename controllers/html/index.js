const renderHome = ({ session }, res) => {
  res.render("home", { session, landing: true })
}

const renderLogin = ({ session }, res) => {
  session.loggedIn ? res.redirect("/") : res.render("login")
}

const { renderPosts, renderSinglePost } = require("./posts-controller")

// const {} = require("./dashboard-controller")

module.exports = { renderHome, renderLogin, renderPosts, renderSinglePost }
