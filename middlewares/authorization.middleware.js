const authorization = (params) => {
  return function(req, res, next) {
    console.log(params)
    if(params === "admin") {
      next()
    } else {
      res.sendResponse("error", 1007)
    }
  }
}

module.exports = {
  authorization
}