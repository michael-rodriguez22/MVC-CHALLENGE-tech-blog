const express = require("express")
const exphbs = require("express-handlebars")
const path = require("path")

const app = express()
const PORT = process.env.PORT | 3003

const routes = require("./controllers")
app.use(routes)

const sequelize = require("./config/connection")

sequelize.sync({ forge: true }).then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})
