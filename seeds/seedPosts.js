const { Post } = require("../models")

const postData = [
  {
    post_title: "dog post 1",
    post_body: "post 1 body",
    user_id: 1,
  },
  {
    post_title: "dog post 2",
    post_body: "post 2 body",
    user_id: 2,
  },
  {
    post_title: "dog post 3",
    post_body: "post 3 body",
    user_id: 3,
  },
  {
    post_title: "dog post 4",
    post_body: "post 4 body",
    user_id: 4,
  },
  {
    post_title: "dog post 5",
    post_body: "post 5 body",
    user_id: 5,
  },
  {
    post_title: "dog post 6",
    post_body: "post 6 body",
    user_id: 6,
  },
  {
    post_title: "dog post 7",
    post_body: "post 7 body",
    user_id: 7,
  },
  {
    post_title: "dog post 8",
    post_body: "post 8 body",
    user_id: 8,
  },
  {
    post_title: "dog post 9",
    post_body: "post 9 body",
    user_id: 9,
  },
  {
    post_title: "dog post 10",
    post_body: "post 10 body",
    user_id: 10,
  },
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts
