const userSchema = require('../schemas/user.schema')
const formatError = require('../helpers/formatError')

const userValidationMiddleware = (req, res, next) => {
  userSchema.validate({ ...req.body }, { abortEarly: false }).then((user) => {
    next()
  }).catch((error) => { res.status(422).json( {errors: formatError(error) } )} )
}

module.exports = userValidationMiddleware