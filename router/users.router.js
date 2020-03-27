const { Router } = require('express')
const { 
  create, 
  find, 
  findById, 
  destroy, 
  update 
} = require('../controllers/users.controller')

const userMiddleware = require('../middlewares/user.middleware')

const userRouter = Router()

userRouter.get('/', find)
userRouter.get('/:id', findById)
userRouter.post('/', userMiddleware, create)
userRouter.put('/:id', userMiddleware, update)
userRouter.delete('/:id', destroy)

module.exports = userRouter 