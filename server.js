const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")
const path = require("path")

const app = express()
const PORT = process.env.PORT | 3003

const sequelize = require("./config/connection")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const sess = {
  secret: "super cooper",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
}

app.use(session(sess))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(require("./controllers"))

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})
