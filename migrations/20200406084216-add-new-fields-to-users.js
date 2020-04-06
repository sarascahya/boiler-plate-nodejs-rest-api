'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'currentSignInAt', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'lastSignInAt', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'currentSignInIp', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'lastSignInIp', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'signInCount', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'uuid', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'jti', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'level', {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'currentSignInAt'),
      queryInterface.removeColumn('Users', 'lastSignInAt'),
      queryInterface.removeColumn('Users', 'currentSignInIp'),
      queryInterface.removeColumn('Users', 'lastSignInIp'),
      queryInterface.removeColumn('Users', 'signInCount'),
      queryInterface.removeColumn('Users', 'uuid'),
      queryInterface.removeColumn('Users', 'jti'),
      queryInterface.removeColumn('Users', 'level')
    ])
  }
}
