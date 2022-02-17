require("dotenv").config()
const Sequelize = require("sequelize")

const {
  DB_URL,
  DB_NAME = "mvc_challenge_tech_blog",
  DB_USER = "root",
  DB_PW,
} = process.env

const sequelize = DB_URL
  ? new Sequelize(DB_URL)
  : new Sequelize(DB_NAME, DB_USER, DB_PW, {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
      logging: false,
    })

module.exports = sequelize
