const User = require('../models')['User']
const { comparePassword } = require('../helpers/bcrypt')
const { generateJwt } = require('../helpers/jwt')

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user && comparePassword(password, user.password)) {
      const token = generateJwt({
        id: user.id,
        uuid: user.uuid,
        email: user.email
      })
      res.status(200).json({ token })
    }
  } catch (err) {
    res.status(201).send({message: 'invalid email/password'})
  }
}