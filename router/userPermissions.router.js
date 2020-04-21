const { Router } = require('express')
const userPermissionController = require('../controllers/userPermissions.controller')
const userPermissionValidationMiddleware = require('../middlewares/userPermissionValidation.middleware')
const { authentication } = require('../middlewares/authentication.middleware')
const { authorization } = require('../middlewares/authorization.middleware')

const userPermissionRouter = Router()
userPermissionRouter.use(authorization(["superadmin", "admin"]))
userPermissionRouter.post('/', userPermissionValidationMiddleware, userPermissionController.create)
userPermissionRouter.get('/', authentication, userPermissionController.find)
userPermissionRouter.get('/:id', authentication, userPermissionController.findById)
userPermissionRouter.put('/:id', authentication, userPermissionValidationMiddleware, userPermissionController.update)
userPermissionRouter.delete('/:id', authentication, userPermissionController.destroy)

module.exports = userPermissionRouter