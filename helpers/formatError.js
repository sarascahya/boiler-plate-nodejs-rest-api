const formatError = (errors) => {
  const formatedError = {}

  errors.inner.map(error => {
    const path = error.path
    const message = error.message
    
    const error_messages = []
    error_messages.push(message)
    
    formatedError[path] = error_messages
    selectedPath = path
  })

  return formatedError
}

module.exports = formatError