const User = require('../models')['User']
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken, generateRefreshToken } = require('../helpers/jwt')
const redisClient = require('../helpers/redis')

exports.login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email: email } })

  if (user && comparePassword(password, user.password)) {
    const token = generateToken({
      id: user.id,
      email: user.email
    })
    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email
    })

    const properties = {
      isRefreshToken: true
    }
    redisClient.setex(`refreshToken:${refreshToken}`, 3600, JSON.stringify(properties))
    
    res.status(200).json({ 
      'status': 200,
      'token': token,
      'refreshToken': refreshToken
    })
  } else {
    res.status(201).send({message: 'invalid email/password'})
  }
}

exports.logout = async(req, res) => {
  const token = await req.headers.authorization

  const properties = {
    isLoggedOut: true
  }

  if (redisClient.setex(`jwtBlacklist:${token}`, 3600, JSON.stringify(properties))) {
    res.status(200).json({
      'status': 200,
      'data': 'You are logged out',
    })
  } else {
    res.status(400).json({
      'status': 400,
      'error': error.toString(),
    })
  }
} 

exports.refreshToken = async (req, res) => {
  const { email, password, refreshToken } = req.body
  const user = await User.findOne({ where: { email: email } })

  if (user && comparePassword(password, user.password)) {
    redisClient.get(`refreshToken:${refreshToken}`, (err, cache) => {
      const properties = JSON.parse(cache)
      if (properties && properties.isRefreshToken) {
        const token = generateToken({
          id: user.id,
          email: user.email
        })
        const refreshToken = generateRefreshToken({
          id: user.id,
          email: user.email
        })
  
        res.status(200).json({ 
          'status': 200,
          'token': token,
          'refreshToken': refreshToken
        })
      } else {
        res.status(401).send({
          status: 401,
          error: 'You need to login'
        })
      }
    })
  } else {
    res.status(401).send({
      status: 401,
      error: 'You need to login'
    })
  }

}