module.exports = {
  format_post_body: body =>
    body.length > 120 ? body.slice(0, 119) + "..." : body,

  format_date: date => new Date(date).toLocaleDateString(),
}
