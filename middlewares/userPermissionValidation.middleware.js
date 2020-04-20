const userPermissionSchema = require('../schemas/userPermission.schema')
const formatError = require('../helpers/formatError')

const userPermissionValidationMiddleware = (req, res, next) => {
  userPermissionSchema.validate({ ...req.body }, { abortEarly: false }).then((user) => {
    next()
  }).catch((error) => { 
    res.sendResponse("error", 1005, formatError(error))
  })
}

module.exports = userPermissionValidationMiddleware