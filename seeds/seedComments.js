const { Comment } = require("../models")

const commentData = [
  {
    comment_body: "dog comment on post 1 from user 10",
    user_id: 10,
    post_id: 1,
  },
  {
    comment_body: "dog comment on post 1 from user 3",
    user_id: 3,
    post_id: 1,
  },
  {
    comment_body: "dog comment on post 5 from user 4",
    user_id: 4,
    post_id: 5,
  },
  {
    comment_body: "dog comment on post 10 from user 10",
    user_id: 10,
    post_id: 10,
  },
  {
    comment_body: "dog comment on post 10 from user 9",
    user_id: 9,
    post_id: 10,
  },
]

const seedComments = () => Comment.bulkCreate(commentData)

module.exports = seedComments
