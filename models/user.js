'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      currentSignInAt: DataTypes.DATE,
      lastSignInAt: DataTypes.DATE,
      currentSignInIp: DataTypes.DATE,
      lastSignInIp: DataTypes.DATE,
      signInCount: DataTypes.INTEGER,
      jti: DataTypes.STRING,
      level: DataTypes.INTEGER,
    }, 
    {}
  )
  return User
}