const jwt = require('jsonwebtoken')

const secret = process.env.SECRET_JWT
const expiresIn = '1h'

const generateJwt = (payload) => {
  return jwt.sign(payload, secret, { expiresIn })
}

const verifyJwt = (token) => {
  return jwt.verify(token, secret)
}

module.exports = {
  generateJwt,
  verifyJwt
}