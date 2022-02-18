const { Post } = require("../models")

const postData = [
  {
    title: "dog post 1",
    description: "dog description",
    post_body: "post 1 body",
    user_id: 1,
  },
  {
    title: "dog post 2",
    description: "dog description",
    post_body: "post 2 body",
    user_id: 2,
  },
  {
    title: "dog post 3",
    description: "dog description",
    post_body: "post 3 body",
    user_id: 3,
  },
  {
    title: "dog post 4",
    description: "dog description",
    post_body: "post 4 body",
    user_id: 4,
  },
  {
    title: "dog post 5",
    description: "dog description",
    post_body: "post 5 body",
    user_id: 5,
  },
  {
    title: "dog post 6",
    description: "dog description",
    post_body: "post 6 body",
    user_id: 6,
  },
  {
    title: "dog post 7",
    description: "dog description",
    post_body: "post 7 body",
    user_id: 7,
  },
  {
    title: "dog post 8",
    description: "dog description",
    post_body: "post 8 body",
    user_id: 8,
  },
  {
    title: "dog post 9",
    description: "dog description",
    post_body: "post 9 body",
    user_id: 9,
  },
  {
    title: "dog post 10",
    description: "dog description",
    post_body: "post 10 body",
    user_id: 10,
  },
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts
