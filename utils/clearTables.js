const sequelize = require("../config/connection")
const { User, Post, Comment } = require("../models")

Comment.destroy({ where: {} })
Post.destroy({ where: {} })
User.destroy({ where: {} })

// USE WITH CAUTION!!!
