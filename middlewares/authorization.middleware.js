const authorization = (permissions = [], me) => {
  return function(req, res, next) {
    if (req.user.level === 1) {
      userLevel = "user" 
    } else if (req.user.level === 2) {
      userLevel = "admin" 
    } else if (req.user.level === 3) {
      userLevel = "superadmin" 
    }

    if (permissions.includes(userLevel)) {
      next()
    } else if (me === "onlyme") {
      if (req.user.id == req.params.id) {
        next()
      } else {
        res.sendResponse("error", 1007)
      }
    } else {
      res.sendResponse("error", 1007)
    }
  }
}

module.exports = {
  authorization
}