module.exports = (err, req, res, next) => {
  console.dir(err)

  let status = res.statusCode === 200 ? 500 : res.statusCode
  const body = { message: err.message }

  if (err.errors && err.errors[0].type === "Validation error") {
    const validatorErr = err.errors[0]
    status = 400
    body.message = `Invalid ${validatorErr.path}${
      validatorErr.validatorKey === "len" &&
      `, must be between ${validatorErr.validatorArgs[0]} and ${validatorErr.validatorArgs[1]} characters long`
    }`
  }

  console.log(`\nError: ${body.message}`.red.bold)

  if (process.env.NODE_ENV !== "production") {
    body.stack = err.stack
    console.log(body.stack.grey, "\n")
  } else console.log("\n")

  return res.status(status).json(body)
}
