const { Router } = require('express')
const userController = require('../controllers/users.controller')
const userValidationMiddleware = require('../middlewares/userValidation.middleware')
const { authentication } = require('../middlewares/authentication.middleware')
const { authorization } = require('../middlewares/authorization.middleware')

const userRouter = Router()
userRouter.post('/', userValidationMiddleware, userController.create)
userRouter.get('/', authentication, authorization(["superadmin", "admin"]), userController.find)
userRouter.get('/:id', authentication, authorization(["superadmin", "admin"]), userController.findById)
userRouter.put('/:id', authentication, authorization(["superadmin", "admin"]), userValidationMiddleware, userController.update)
userRouter.delete('/:id', authentication, authorization(["superadmin", "admin"]), userController.destroy)
userRouter.get('/:id/permissions', authentication, authorization(["superadmin", "admin"]), userController.userPermissions)

module.exports = userRouter