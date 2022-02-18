module.exports = (err, req, res, next) => {
  let status = res.statusCode === 200 ? 500 : res.statusCode
  const body = { message: err.message }

  if (err.errors && err.errors[0].type === "Validation error") {
    status = 400
    body.message = `Invalid ${err.errors[0].path}`
  }

  console.log(`\nError: ${body.message}`.red.bold)

  if (process.env.NODE_ENV !== "production") {
    body.stack = err.stack
    console.log(body.stack.grey, "\n")
  } else console.log("\n")

  return res.status(status).json(body)
}
