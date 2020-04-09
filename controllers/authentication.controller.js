const User = require('../models')['User']
const { comparePassword } = require('../helpers/bcrypt')
const { generateJwt } = require('../helpers/jwt')
const redisClient = require('../helpers/redis')

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user && comparePassword(password, user.password)) {
      const token = generateJwt({
        id: user.id,
        email: user.email
      })
      res.status(200).json({ token })
    }
  } catch (error) {
    res.status(201).send({message: 'invalid email/password'})
  }
}

exports.logout = async(req, res) => {
  const token = await req.headers.authorization

  const properties = {
    isLoggedOut: true
  }

  if (redisClient.setex(`jwt_blacklist:${token}`, 3600, JSON.stringify(properties))) {
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