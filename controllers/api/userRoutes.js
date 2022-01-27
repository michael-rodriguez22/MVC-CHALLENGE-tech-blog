const router = require("express").Router()
const { User, Post, Comment } = require("../../models")

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then(dbUserData => res.status(200).json(dbUserData))
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "post_title", "post_body", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_body", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then(dbUserData => {
      return !dbUserData
        ? res.status(404).json({ message: "No user found with this id" })
        : res.status(200).json(dbUserData)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

router.post("/", (req, res) => {
  // expects { username: String, email: String, password: String }
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id
        req.session.username = dbUserData.username
        req.session.email = dbUserData.email
        req.session.loggedIn = true

        userDataCopy = {
          id: dbUserData.id,
          username: dbUserData.username,
          email: dbUserData.email,
          // don't send hashed password back in response
        }

        return res.status(200).json({
          user: userDataCopy,
          message:
            "Welcome to the tech blog! Would you like to create your first post?",
        })
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ err, message: "Something went wrong" })
    })
})

router.post("/login", (req, res) => {
  // expects { email: String, password: String }
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(dbUserData => {
      if (!dbUserData)
        return res.status(400).json({ message: "Incorrect login credentials" })

      const validPassword = dbUserData.checkPassword(req.body.password)

      return !validPassword
        ? res.status(400).json({ message: "Incorrect login credentials" })
        : req.session.save(() => {
            req.session.user_id = dbUserData.id
            req.session.username = dbUserData.username
            req.session.email = dbUserData.email
            req.session.loggedIn = true

            userDataCopy = {
              id: dbUserData.id,
              username: dbUserData.username,
              email: dbUserData.email,
              // don't send hashed password back in response
            }

            return res
              .status(200)
              .json({ user: userDataCopy, message: "You are now logged in" })
          })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ err, message: "Something went wrong" })
    })
})

router.post("/logout", (req, res) => {
  return req.session.loggedIn === true
    ? req.session.destroy(() => res.status(204).end())
    : res.status(404).end()
})

router.put("/:id", (req, res) => {
  // expects { username?: String, email?: String, password?: String }
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then(dbUserData => {
      return !dbUserData[0] > 0
        ? res.status(404).json({ message: "No user found with this id" })
        : res.status(200).json(dbUserData)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ err, message: "Something went wrong" })
    })
})

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(dbUserData => {
      return !dbUserData
        ? res.status(404).json({ message: "No user found with this id" })
        : res.status(200).json(dbUserData)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
})

module.exports = router
