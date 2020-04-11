const redisClient = require('../helpers/redis')
const jwt = require('jsonwebtoken')

const authentication = async(req, res, next) => {
  const token = await req.headers.authorization

  if (!token) {
    res.status(401).send({
      status: 401,
      error: 'You need to login'
    })
  } else {
    redisClient.get(`jwtBlacklist:${token}`, (err, cache) => {
      console.log(cache)
      const properties = JSON.parse(cache)
      if (properties && properties.isLoggedOut) {
        res.status(401).send({
          status: 401,
          error: 'You need to login'
        })
      } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
          if (err) {
            res.status(403).send({
              status: 403,
              error: 'No token provided.'
            })
          } else {
            next()
          }
        })
      }
    })
  }
}

module.exports = {
  authentication
}