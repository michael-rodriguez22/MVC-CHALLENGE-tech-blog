const asyncHandler = require("express-async-handler")
const { Post, Comment } = require("../../models")

const handle404 = (resource = "comment") => `No ${resource} found with this id`

const createComment = asyncHandler(async ({ body, params, session }, res) => {
  const { comment_body } = body

  if (!comment_body) {
    res.status(400)
    throw new Error("Comment body is required")
  }

  const post = await Post.findByPk(params.postId)

  if (!post) {
    res.status(404)
    throw new Error(handle404("post"))
  }

  const comment = await Comment.create({
    comment_body,
    user_id: session.user.id,
    post_id: params.postId,
  })

  return res.status(201).json(comment)
})

const editComment = asyncHandler(async ({ body, params, session }, res) => {
  const { comment_body } = body

  if (!comment_body) {
    res.status(400)
    throw new Error("Comment body is required")
  }

  const comment = await Comment.findByPk(params.commentId)

  if (!comment) {
    res.status(404)
    throw new Error(handle404())
  }

  if (comment.user_id !== session.user.id) {
    res.status(400)
    throw new Error("Not authorized to edit this comment")
  }

  comment.set({ comment_body })

  await comment.save()

  return res.status(200).json(comment)
})

const deleteComment = asyncHandler(async ({ params, session }, res) => {
  const comment = await Comment.findByPk(params.commentId)

  if (!comment) {
    res.status(404)
    throw new Error(handle404())
  }

  if (comment.user_id !== session.user.id) {
    res.status(400)
    throw new Error("Not authorized to delete this comment")
  }

  await comment.destroy()

  return res.status(200).json({ message: "Comment successfully deleted" })
})

module.exports = { createComment, editComment, deleteComment }
