const redisClient = require('../helpers/redis')
const { verifyToken } = require('../helpers/jwt')

const authentication = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).send({
      status: 401,
      error: 'You need to login'
    })
  }

  redisClient.get(`jwtBlacklist:${token}`, (err, cache) => {
    const properties = JSON.parse(cache)
    if (properties && properties.isLoggedOut) {
      res.status(401).send({
        status: 401,
        error: 'You need to login'
      })
    } 

    const verified = verifyToken(token)
    if (verified) {
      next()
    } else {
      res.status(403).send({
        status: 403,
        error: 'No token provided.'
      })
    }
  })
}

module.exports = {
  authentication
}