const jwt = require('jsonwebtoken')

const tokenSecret = process.env.TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

// time in s
const tokenExpiredIn = 3600 // 1 hour
const refreshTokenExpiredIn = 86400 // 1 day

const generateToken = (payload) => {
  return jwt.sign(payload, tokenSecret, { expiresIn: tokenExpiredIn })
}

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: refreshTokenExpiredIn })
}

module.exports = {
  generateToken,
  generateRefreshToken,
}