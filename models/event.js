'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {}, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};