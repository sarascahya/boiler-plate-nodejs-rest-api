const db = require('../models')
const User = db['User']
const userSchema = require('../schema/user.schema')

// const createMiddleware = (req, res, next) => {
//   userSchema.validate({ ...req.body })
//     .then(user => next())
//     .catch(error => res.status(422).json(error))
// }

const find = (req, res) => {
  User.findAll({
    where: { ...req.params }
  }).then(user => {
    res.json(user)
  }).catch(err => {
    res.json(422, err)
  })
}

const findById = (req, res) => {
  User.findAll({
    where: { ...req.params }
  }).then(user => {
    res.json(user)
  }).catch(err => {
    res.json(422, err)
  })
} 

const create = (req, res) => {
  // User.create(req.body).then(user => {
  //   res.json(user)
  // }).catch(err => {
  //   res.status(422).json(err)
  // })

  userSchema.validate({ ...req.body }).then(user => {
    User.create(user).then(data => {
      res.status(201).json(data)
    }).catch(error => res.status(422).json(err))
  }).catch(error => res.status(422).json(error))

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
    res.json(422, err)
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
    res.json(422, err)
  })
  
}

module.exports = {
  create,
  find,
  findById,
  destroy,
  update,
  createMiddleware
}