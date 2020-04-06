const uuidv4 = require('uuid/v4')

const generateUuid = () => {
  return uuidv4()
}

module.exports = generateUuid