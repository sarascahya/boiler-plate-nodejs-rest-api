const { object, string } = require('yup')

const userSchema = object().shape({
  firstName: string()
    .required('required'),
  lastName: string(),
  email: string()
    .required('required')
    .email('must be a valid email'),
  password: string()
    .required('required')
})

module.exports = userSchema