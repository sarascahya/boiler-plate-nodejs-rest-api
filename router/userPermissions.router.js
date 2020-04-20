const { Router } = require('express')
const userPermissionController = require('../controllers/userPermissions.controller')
const userPermissionValidationMiddleware = require('../middlewares/userPermissionValidation.middleware')
// const { authentication } = require('../middlewares/authentication.middleware')
// const { authorization } = require('../middlewares/authorization.middleware')

const userPermissionRouter = Router()
// userPermissionRouter.use(authorization(["admin"]))
userPermissionRouter.post('/', userPermissionValidationMiddleware, userPermissionController.create)
userPermissionRouter.get('/', userPermissionController.find)
userPermissionRouter.get('/:id', userPermissionController.findById)
userPermissionRouter.put('/:id', userPermissionValidationMiddleware, userPermissionController.update)
userPermissionRouter.delete('/:id', userPermissionController.destroy)

module.exports = userPermissionRouter