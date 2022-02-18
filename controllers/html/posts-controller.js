const { Post, User, Comment } = require("../../models")

const renderPosts = async ({ params, session }, res) => {
  // TODO: handle search and sort
  const handleWhere = () => {
    return {}
  }

  const handleOrder = () => {
    return []
  }

  let posts = await Post.findAll({
    where: handleWhere(),
    order: handleOrder(),
    include: [
      { model: Comment, attributes: ["id"] },
      { model: User, attributes: ["id", "username"] },
    ],
  })

  posts = posts.map(post => post.get({ plain: true }))

  return res.render("posts", { params, posts, session })
}

const renderSinglePost = async ({ params, session }, res) => {
  try {
    let post = await Post.findByPk(params.postId, {
      include: [
        { model: Comment, attributes: { exclude: "post_id" } },
        { model: User, attributes: ["id", "username"] },
      ],
    })

    if (!post) {
      throw new Error("No post found with this id")
    }

    post = post.get({ plain: true })

    return res.render("single-post", { post, session })
  } catch (err) {
    return res.render("single-post", { err })
  }
}

module.exports = { renderPosts, renderSinglePost }
