const sequelize = require("../config/connection")
const { User, Post, Comment } = require("../models")

const clearTables = async () => {
  await Comment.destroy({ where: {} })
  await Post.destroy({ where: {} })
  await User.destroy({ where: {} })
  process.exit(0)
}

clearTables()
// USE WITH CAUTION!!!
