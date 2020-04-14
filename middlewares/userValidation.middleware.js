const userSchema = require('../schemas/user.schema')
const formatError = require('../helpers/formatError')

const userValidationMiddleware = (req, res, next) => {
  userSchema.validate({ ...req.body }, { abortEarly: false }).then((user) => {
    next()
  }).catch((error) => { 
    res.sendResponse("error", 1005, formatError(error))
  })
}

module.exports = userValidationMiddleware