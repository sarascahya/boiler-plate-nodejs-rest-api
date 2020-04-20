require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

const authenticationRouter = require('./router/authentication.router')
const userRouter = require('./router/users.router')
const userPermissionRouter = require('./router/userPermissions.router')
const serializer = require('./middlewares/responseSerializer.middleware')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(serializer)

app.use('/', authenticationRouter)
app.use('/users', userRouter)
app.use('/user_permissions', userPermissionRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))