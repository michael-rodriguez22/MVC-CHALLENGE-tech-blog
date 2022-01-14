const { User } = require("../models")

const userData = [
  {
    username: "doggy1",
    email: "doggy1@dogmail.com",
    password: "12356",
  },
  {
    username: "doggy2",
    email: "doggy2@dogmail.com",
    password: "12356",
  },
  {
    username: "doggy3",
    email: "doggy3@dogmail.com",
    password: "12356",
  },
  {
    username: "doggy4",
    email: "doggy4@dogmail.com",
    password: "12356",
  },
  {
    username: "doggy5",
    email: "doggy5@dogmail.com",
    password: "12356",
  },
  {
    username: "doggy6",
    email: "doggy6@dogmail.com",
    password: "12356",
  },
  {
    username: "doggy7",
    email: "doggy7@dogmail.com",
    password: "12356",
  },
  {
    username: "doggy8",
    email: "doggy8@dogmail.com",
    password: "12356",
  },
  {
    username: "doggy9",
    email: "doggy9@dogmail.com",
    password: "12356",
  },
  {
    username: "doggy10",
    email: "doggy10@dogmail.com",
    password: "12356",
  },
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers
