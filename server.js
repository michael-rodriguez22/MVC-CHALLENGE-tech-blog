require("colors")
const path = require("path")
const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")

const app = express()
const sequelize = require("./config/connection")

// create session
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const sess = {
  secret: "super cooper",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
}

// configure handlebars
const helpers = require("./utils/helpers")
const hbs = exphbs.create({ helpers })
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

// configure middleware
app.use(session(sess))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(require("./routes"))
app.use(require("./middleware/error-handler"))

const { NODE_ENV = "development", PORT = 3003 } = process.env
;(async () => {
  try {
    // authenticate connection
    console.log("\nConnecting to database...".cyan.bold)
    await sequelize.authenticate()
    console.log(
      `Connection successful! DB: ${sequelize.config.database}`.green.bold
    )

    // enable logging outside of production environment
    sequelize.options.logging = NODE_ENV !== "production" ? console.log : false

    // sync models
    console.log("\nSyncing models...".cyan.bold)
    await sequelize.sync({ force: false })

    // start server
    app.listen(PORT, () =>
      console.log(`\nServer started on port ${PORT}\n`.magenta.bold)
    )
  } catch (err) {
    console.log(`Error: ${err.message}\n`.red.bold, err.stack.dim)
    return process.exit(1)
  }
})()
