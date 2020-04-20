const errorDictionary = require('../helpers/errorDictionary')
const successDictionary = require('../helpers/successDictionary')

module.exports = (req, res, next) => {
  res.sendResponse = (type, content, object) => {
    if (type === "error") {
      const errorMessage = errorDictionary[content]
      if (errorMessage) {
        res.status(errorMessage.httpCode).json({
          http: "error",
          code: content,
          details: {...errorMessage, errors: object}
        })
      } else {
        res.sendResponse("error", 1004)
      }
    } else if (type === "success") {
      const successMessage = successDictionary[content]
      if (successMessage) {
        res.status(successMessage.httpCode).json({
          http: "success",
          code: content,
          details: {...successMessage, data: object}
        })
      } else {
        res.sendResponse("error", 1004)
      }
    }
  }
  next()
}