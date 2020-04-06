const User = require('../models')['User']
const { comparePassword } = require('../helpers/bcrypt')
const { generateJwt } = require('../helpers/jwt')

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    console.log(user)
    if (user && comparePassword(password, user.password)) {
      const token = generateJwt({
        id: user.id,
        email: user.email
      })
    
      console.log(token)
    
      res.status(200).json({ token })
    }
  } catch (err) {
    res.status(201).send({message: 'invalid email/password'})
  }
}