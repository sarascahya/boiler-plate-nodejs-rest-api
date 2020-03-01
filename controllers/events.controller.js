const db = require('../models')
const Event = db['Event']

const find = (req, res) => {
  Event.findAll({
    where: { ...req.params }
  }).then(event => {
    res.json(event)
  }).catch(err => {
    res.json(422, err)
  })
}

const findById = (req, res) => {
  Event.findAll({
    where: { ...req.params }
  }).then(event => {
    res.json(event)
  }).catch(err => {
    res.json(422, err)
  })
}

const create = (req, res) => {
  Event.create(req.body).then(event => {
    res.json(event)
  }).catch(err => {
    res.json(422, err)
  })
}

const destroy = async (req, res) => {
  const temp = await Event.findAll({ 
    where: { 
      id: req.params.id 
    } 
  }).then(event => event).catch(() => null)

  await Event.destroy({
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
  Event.update(
    { ...req.body },
    { 
      where: {
        id: req.params.id,
      }
    }
  ).then(async () => {
    const temp = await Event.findAll({ 
      where: { 
        id: req.params.id 
      } 
    }).then(updatedEvent => updatedEvent).catch(() => null)

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
}