const { Router } = require('express')
const authenticationController = require('../controllers/authentication.controller')

const authenticationRouter = Router()

authenticationRouter.post('/login', authenticationController.login)
authenticationRouter.delete('/logout', authenticationController.logout)
authenticationRouter.post('/refreshToken', authenticationController.refreshToken)

module.exports = authenticationRouter