const redisClient = require('../helpers/redis')
const { verifyToken } = require('../helpers/jwt')

const authentication = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    res.sendResponse("error", 1001)
  } else {
    redisClient.get(`jwtBlacklist:${token}`, (err, cache) => {
      const properties = JSON.parse(cache)
      if (properties && properties.isLoggedOut) {
        res.sendResponse("error", 1001)
      } else {
        const decoded = verifyToken(token)
        if (decoded) {
          req.user = decoded
          next()
        } else {
          res.sendResponse("error", 1003)
        }
      }

    })
  }
}

module.exports = {
  authentication
}