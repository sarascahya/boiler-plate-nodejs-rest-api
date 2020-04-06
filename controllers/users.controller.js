const User = require('../models')['User']
const { hashPassword } = require('../helpers/bcrypt')
const generateUuid = require('../helpers/generateUuid')

exports.find = (req, res) => {
  User.findAll({
    where: { ...req.params }
  }).then(user => {
    res.json(user)
  }).catch(err => {
    res.status(422).json(err)
  })
}

exports.findById = (req, res) => {
  User.findByPk(req.params.id).then(user => {
    res.json(user)
  }).catch(err => {
    res.status(422).json(err)
  })
} 

exports.create = (req, res) => {
  let { firstName, lastName, username, email, password, uuid } = req.body
  password = hashPassword(password)
  uuid = generateUuid()

  User.create({ firstName, lastName, username, email, password, uuid }).then(user => {
    res.status(201).json(user)
  }).catch(err => {
    res.status(422).json(err)
  })
}

exports.destroy = async (req, res) => {
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

exports.update = (req, res) => {
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