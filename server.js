const express = require("express")
const exphbs = require("express-handlebars")
const path = require("path")

const app = express()
const PORT = process.env.PORT | 3003

const sequelize = require("./config/connection")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(require("./controllers"))

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})
