module.exports = {
  preview_post_body: body =>
    body.length > 120 ? body.slice(0, 119) + "..." : body,

  // @todo - ensure posts and comments can be rendered with line breaks

  edit_privileges: (sessUserId, commentUserId) => sessUserId === commentUserId,

  delete_privileges: (sessUserId, commentUserId, postUserId) =>
    sessUserId === commentUserId || sessUserId === postUserId,

  format_date: date => new Date(date).toLocaleDateString(),
}
