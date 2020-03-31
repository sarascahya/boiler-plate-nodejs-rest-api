const { Router } = require('express')
const { 
  create, 
  find, 
  findById, 
  destroy, 
  update,
  login
} = require('../controllers/users.controller')

const userMiddleware = require('../middlewares/user.middleware')
const { authentication } = require('../middlewares/auth')

const userRouter = Router()

userRouter.post('/', userMiddleware, create)
userRouter.post('/login', login)

userRouter.use(authentication)
userRouter.get('/', find)
userRouter.get('/:id', findById)
userRouter.put('/:id', userMiddleware, update)
userRouter.delete('/:id', destroy)

module.exports = userRouter 