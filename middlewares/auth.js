const { verifyJwt } = require('../utils/jwt')

const authentication = (req, res, next) => {
  try {
    const decode = verifyJwt(req.headers.authorization)
    req.user = decode
    next()
  } catch {
    res.status(401).json({ message: 'You need to login'})
  }
}

module.exports = {
  authentication
}