const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 100] },
      set(title) {
        this.setDataValue("title", title.trim())
      },
    },

    description: {
      type: DataTypes.STRING,
      validate: { len: [1, 280] },
      set(description) {
        this.setDataValue("description", description.trim())
      },
    },

    post_body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [10, 65535] },
      set(post_body) {
        this.setDataValue("post_body", post_body.trim())
      },
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
)

module.exports = Post
