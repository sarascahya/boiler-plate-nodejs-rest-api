const { object, number, array } = require('yup')

const userPermissionSchema = object().shape({
  userId: number()
    .required('required'),
  permissions: array()
})

module.exports = userPermissionSchema