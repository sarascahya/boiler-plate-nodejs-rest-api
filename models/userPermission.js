'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPermission = sequelize.define(
    'UserPermission', 
    {
      userId: DataTypes.INTEGER,
      permissions: DataTypes.ARRAY(DataTypes.STRING)
    }, 
    {}
  )
  return UserPermission;
}