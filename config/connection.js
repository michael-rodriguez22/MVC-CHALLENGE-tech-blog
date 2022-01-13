const Sequelize = require("sequelize")

require("dotenv").config()

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    })

sequelize
  .authenticate()
  .then(() => console.log(`Successfully connected to database...`))
  .catch(err => console.log(`Error connecting to database... ${err}`))

module.exports = sequelize
