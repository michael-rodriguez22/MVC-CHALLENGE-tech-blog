const express = require("express")

const app = express()
const PORT = process.env.PORT | 3003

const sequelize = require("./config/connection")

sequelize.sync({ forge: true }).then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})
