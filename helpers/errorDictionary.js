module.exports = {
    1001: {
      httpCode: 400,
      status: "Bad Request",
      message: "Can't handle your request",
    },

    1002: {
      httpCode: 401,
      status: "Unauthorized",
      message: "You need to login",
    },

    1003: {
      httpCode: 403,
      status: "Forbidden",
      message: "No token provided",
    },

    1004: {
      httpCode: 404,
      status: "Not Found",
      message: "This service is not found",
    },

    1005: {
      httpCode: 422,
      status: "Unprocessable Entity",
      message: "Something went wrong",
    },

    1006: {
      httpCode: 500,
      status: "Internal Server Error",
      message: "Please try again later",
    },

    1007: {
      httpCode: 401,
      status: "Unauthorized",
      message: "You don't have access to this service",
    },
  }