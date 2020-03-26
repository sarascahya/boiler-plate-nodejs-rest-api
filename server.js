const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const EventRouter = require('./router/event.router')
const UserRouter = require('./router/users.router')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/events', EventRouter)
app.use('/users', UserRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));