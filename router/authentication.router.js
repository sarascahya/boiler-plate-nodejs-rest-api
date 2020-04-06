const { Router } = require ('express')
const authenticationController = require('../controllers/authentication.controller')

const authenticationRouter = Router()

authenticationRouter.post('/login', authenticationController.login)

module.exports = authenticationRouter