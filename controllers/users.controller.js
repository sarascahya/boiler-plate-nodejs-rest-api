const User = require('../models')['User']
const UserPermission = require('../models')['UserPermission']
const { hashPassword } = require('../helpers/bcrypt')

exports.find = (req, res) => {
  User.findAll({
    where: { ...req.params },
    attributes: ["id", "firstName", "lastName", "username", "email", "level", "createdAt"]
  }).then(users => {
    res.sendResponse("success", 2001, users)
  }).catch(err => {
    res.sendResponse("error", 1005)
  })
}

exports.findById = (req, res) => {
  User.findByPk(
    req.params.id, 
    { attributes: ["id", "firstName", "lastName", "username", "email", "level", "createdAt"] }
  ).then(user => {
    if (!user) {
      res.sendResponse("error", 1005)
    }
    res.sendResponse("success", 2001, user)
  }).catch(err => {
    res.sendResponse("error", 1005)
  })
} 

exports.create = (req, res) => {
  let { firstName, lastName, username, email, password, level } = req.body
  password = hashPassword(password)

  if (level) {
    if (level === "user") {
      level = 1
    } else if (level === "admin"){
      level = 2
    } else if (level === "superadmin"){
      level = 3
    } else {
      res.sendResponse("error", 1005, {"level": "undefined level"})
    }
  } else {
    level = 1
    permissions = ["user"]
  }

  User.create(
    { firstName, lastName, username, email, password, level },
  ).then(user => {
    generateUserPermission(user.level, user.id)
    
    const response = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      level: level,
      createdAt: user.createdAt,
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
      attributes: ["id", "firstName", "lastName", "username", "email", "level", "createdAt"]
    })
    res.sendResponse("success", 2004, temp)
  }).catch(err => {
    res.sendResponse("error", 1006)
  })
}

exports.userPermissions = (req, res) => {
  UserPermission.findOne({
    where: { userId: req.params.id },
    attributes: ["id", "userId", "permissions", "createdAt"]
  }).then(userPermission => {
    if (!userPermission) {
      res.sendResponse("error", 1005)
    }
    res.sendResponse("success", 2001, userPermission)
  }).catch(err => {
    res.sendResponse("error", 1005)
  })
}

const generateUserPermission = (level, userId) => {
  if (level === 1) {
    permissions = ["user"]
  } else if (level === 2) {
    permissions = ["admin", "user"]
  } else if (level === 3) {
    permissions = ["superAdmin", "admin", "user"]
  }

  UserPermission.create(
    { userId, permissions },
  ).then(userPermission => {
    return true
  }).catch(err => {
    return false
  })
}
