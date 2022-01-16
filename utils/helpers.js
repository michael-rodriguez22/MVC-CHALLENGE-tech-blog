module.exports = {
  preview_post_body: body =>
    body.length > 120 ? body.slice(0, 119) + "..." : body,

  // @todo - ensure posts and comments can be rendered with line breaks

  format_date: date => new Date(date).toLocaleDateString(),
}
