const { verifyJwt } = require('../helpers/jwt')
const redisClient = require('../helpers/redis')

const authentication = async(req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    res.status(401).send({
      status: 401,
      error: 'You need to login'
    })
  } else {
    redisClient.get(`jwt_blacklist:${token}`, (err, cache) => {
      console.log(cache)
      const properties = JSON.parse(cache)
      if (properties && properties.isLoggedOut) {
        res.status(401).send({
          status: 401,
          error: 'You need to login'
        })
      } else {
        next()
      }
    })
  }
}

module.exports = {
  authentication
}