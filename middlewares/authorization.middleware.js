const authorization = (params) => {
  return function(req, res, next) {
    console.log(params)
    if(params === "admin") {
      next()
    } else {
      res.status(401).json({message: "you not allow"})
    }
  }
}

module.exports = {
  authorization
}