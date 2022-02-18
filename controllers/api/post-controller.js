const asyncHandler = require("express-async-handler")
const { Post, User, Comment } = require("../../models")

const handle404 = (resource = "post") => `No ${resource} found with this id`

// @method  GET
// @access  public
// @route   /api/posts/
// @desc    Get all posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.findAll({
    attributes: {
      exclude: ["user_id"],
    },
    include: [
      { model: User, attributes: ["id", "username"] },
      { model: Comment, attributes: ["id"] },
    ],
  })

  return res.status(200).json(posts)
})

// @method  POST
// @access  private
// @route   /api/posts/
// @desc    Create new post
const createPost = asyncHandler(async ({ body, session }, res) => {
  const { title, description, post_body } = body

  if (!title || !post_body) {
    res.status(400)
    throw new Error("Title and post body are required")
  }

  const post = await Post.create({
    title,
    description: description || null,
    post_body,
    user_id: session.user.id,
  })

  return res.status(201).json(post)
})

// get single post
const getPostById = asyncHandler(async ({ params }, res) => {
  const post = await Post.findByPk(params.id, {
    include: [
      { model: User, attributes: ["id", "username"] },
      {
        model: Comment,
        attributes: {
          exclude: ["post_id", "user_id"],
        },
        include: {
          model: User,
          attributes: ["id", "username"],
        },
      },
    ],
  })

  if (!post) {
    res.status(404)
    throw new Error(handle404())
  }

  return res.status(200).json(post)
})

// edit post
const editPost = asyncHandler(async ({ body, session, params }, res) => {
  const { title, description, post_body } = body

  if (!title && !description && !post_body) {
    res.status(400)
    throw new Error("No information was sent to be updated")
  }

  const post = await Post.findByPk(params.id)

  if (!post) {
    res.status(404)
    throw new Error(handle404())
  }

  if (post.user_id !== session.user.id) {
    res.status(400)
    throw new Error("Not authorized to edit this post")
  }

  if (title) post.title = title
  if (description) post.description = description
  if (post_body) post.post_body = post_body

  await post.save()

  return res.status(200).json(post)
})

// delete post
const deletePost = asyncHandler(async ({ session, params }, res) => {
  const post = await Post.findByPk(params.id)

  if (!post) {
    res.status(404)
    throw new Error(handle404())
  }

  if (post.user_id !== session.user.id) {
    res.status(400)
    throw new Error("Not authorized to delete this post")
  }

  await post.destroy()

  return res.status(200).json({ message: "Post successfully deleted" })
})

module.exports = { getPosts, createPost, getPostById, editPost, deletePost }
