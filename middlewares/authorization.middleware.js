const authorization = (permissions = []) => {
  return function(req, res, next) {
    if (req.user.level === 1) {
      userLevel = "user" 
    } else if (req.user.level === 2) {
      userLevel = "admin" 
    } else if (req.user.level === 3) {
      userLevel = "superadmin" 
    }

    if (permissions.length && !permissions.includes(userLevel)) {
      res.sendResponse("error", 1007)
    } else {
      next()
    }
  }
}

module.exports = {
  authorization
}