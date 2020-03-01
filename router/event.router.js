const { Router } = require('express')
const { 
  create, 
  find, 
  findById, 
  destroy, 
  update 
} = require('../controllers/events.controller')

const eventRouter = Router()

eventRouter.get('/', find)
eventRouter.get('/:id', findById)
eventRouter.post('/', create)
eventRouter.put('/:id', update)
eventRouter.delete('/:id', destroy)

module.exports = eventRouter