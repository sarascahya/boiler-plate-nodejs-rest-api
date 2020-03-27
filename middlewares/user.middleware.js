const userSchema = require('../schemas/user.schema')
const formatError = require('../utils/formatError')

const userMiddleware = (req, res, next) => {
  userSchema.validate({ ...req.body }, { abortEarly: false }).then((user) => {
    next()
  }).catch((error) => { res.status(422).json( {errors: formatError(error) } )} )
}

module.exports = userMiddleware