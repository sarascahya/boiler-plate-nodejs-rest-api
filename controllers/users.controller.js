const User = require('../models')['User']
const { hashPassword } = require('../helpers/bcrypt')

exports.find = (req, res) => {
  User.findAll({
    where: { ...req.params },
    attributes: ["id", "firstName", "lastName", "username", "email", "level"]
  }).then(users => {
    res.sendResponse("success", 2001, users)
  }).catch(err => {
    res.sendResponse("error", 1005)
  })
}

exports.findById = (req, res) => {
  User.findByPk(
    req.params.id, 
    { attributes: ["id", "firstName", "lastName", "username", "email", "level"] }
  ).then(user => {
    res.sendResponse("success", 2001, user)
  }).catch(err => {
    res.sendResponse("error", 1005)
  })
} 

exports.create = (req, res) => {
  let { firstName, lastName, username, email, password } = req.body
  password = hashPassword(password)

  User.create(
    { firstName, lastName, username, email, password },
  ).then(user => {
    const response = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      level: user.level,
    }
    res.sendResponse("success", 2003, response)
  }).catch(err => {
    res.sendResponse("error", 1005)
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
    res.sendResponse("success", 2005, temp[0])
  }).catch(err => {
    res.sendResponse("error", 1005)
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
      }, 
      attributes: ["id", "firstName", "lastName", "username", "email", "level"]
    })
    res.sendResponse("success", 2004, temp)
  }).catch(err => {
    res.sendResponse("error", 1006)
  })
}