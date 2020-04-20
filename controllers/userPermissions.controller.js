const UserPermission = require('../models')['UserPermission']

exports.find = (req, res) => {
  UserPermission.findAll({
    where: { ...req.params },
    attributes: ["id", "userId", "permissions", "createdAt"]
  }).then(users => {
    res.sendResponse("success", 2001, users)
  }).catch(err => {
    res.sendResponse("error", 1005)
  })
}

exports.findById = (req, res) => {
  UserPermission.findByPk(
    req.params.id, 
    { attributes: ["id", "userId", "permissions", "createdAt"] }
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
  let { userId, permissions } = req.body
  UserPermission.create(
    { userId, permissions },
  ).then(userPermission => {
    const response = {
      id: userPermission.id,
      userId: userPermission.userId,
      permissions: userPermission.permissions,
      createdAt: userPermission.createdAt,
    }
    res.sendResponse("success", 2003, response)
  }).catch(err => {
    res.sendResponse("error", 1005)
  })
}

exports.destroy = async (req, res) => {
  const temp = await UserPermission.findAll({ 
    where: { 
      id: req.params.id 
    } 
  }).then(user => user).catch(() => null)

  await UserPermission.destroy({
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
  UserPermission.update(
    { ...req.body },
    { 
      where: {
        id: req.params.id,
      }
    }
  ).then(async () => {
    const temp = await UserPermission.findAll({ 
      where: { 
        id: req.params.id 
      }, 
      attributes: ["id", "userId", "permissions", "createdAt"]
    })
    res.sendResponse("success", 2004, temp)
  }).catch(err => {
    res.sendResponse("error", 1006)
  })
}