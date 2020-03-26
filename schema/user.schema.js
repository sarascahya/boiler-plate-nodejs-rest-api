const { object, string } = require('yup')

const userSchema = object().shape({
  firstName: string()
    .required(),
  lastName: string(),
  email: string()
    .email()
    .required(),
  password: string()
    .required(),
})

module.exports = userSchema