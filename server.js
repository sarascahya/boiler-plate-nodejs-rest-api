const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const EventRouter = require('./router/event.router')

app.use(bodyParser.json())

app.use('/events', EventRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));