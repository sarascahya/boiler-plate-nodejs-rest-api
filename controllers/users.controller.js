const db = require('../models')
const User = db['User']
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { generateJwt } = require('../helpers/jwt')

const find = (req, res) => {
  User.findAll({
    where: { ...req.params }
  }).then(user => {
    res.json(user)
  }).catch(err => {
    res.status(422).json(err)
  })
}

const findById = (req, res) => {
  User.findByPk(req.params.id).then(user => {
    res.json(user)
  }).catch(err => {
    res.status(422).json(err)
  })
} 

const create = (req, res) => {
  let { firstName, lastName, username, email, password } = req.body
  password = hashPassword(password)

  User.create({ firstName, lastName, username, email, password }).then(user => {
    res.status(201).json(user)
  }).catch(err => {
    res.status(422).json(err)
  })
}

const destroy = async (req, res) => {
  const temp = await User.findAll({ 
    where: { 
      id: req.params.id 
    } 
  }).then(user => user).catch(() => null)

  await User.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.json(temp[0])
  }).catch(err => {
    res.status(422).json(err)
  })
}

const update = (req, res) => {
  User.update(
    { ...req.body },
    { 
      where: {
        id: req.params.id,
      }
    }
  ).then(async () => {
    const temp = await User.findAll({ 
      where: { 
        id: req.params.id 
      } 
    }).then(updatedUser => updatedUser).catch(() => null)

    res.json(temp)
  }).catch(err => {
    res.status(422).json(err)
  })
}

const login = async (req, res) => {
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

module.exports = {
  create,
  find,
  findById,
  destroy,
  update,
  login
}