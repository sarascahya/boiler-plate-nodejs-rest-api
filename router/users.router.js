const { Router } = require('express')
const userController = require('../controllers/users.controller')
const userValidationMiddleware = require('../middlewares/userValidation.middleware')
const { authentication } = require('../middlewares/authentication.middleware')
const { authorization } = require('../middlewares/authorization.middleware')

const userRouter = Router()
userRouter.post('/', userValidationMiddleware, userController.create)
userRouter.get('/', authentication, userController.find)
userRouter.get('/:id', authentication, userController.findById)
userRouter.put('/:id', authentication, userValidationMiddleware, userController.update)
userRouter.delete('/:id', authentication, userController.destroy)

module.exports = userRouter