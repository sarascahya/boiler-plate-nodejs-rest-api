const { Router } = require('express')
const { 
  create, 
  find, 
  findById, 
  destroy, 
  update 
} = require('../controllers/users.controller')

const userRouter = Router()

userRouter.get('/', find)
userRouter.get('/:id', findById)
userRouter.post('/', create)
userRouter.put('/:id', update)
userRouter.delete('/:id', destroy)

module.exports = userRouter 