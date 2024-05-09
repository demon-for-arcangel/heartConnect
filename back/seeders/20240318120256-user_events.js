'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(process.env.TABLE_USER_EVENTS, [
      {
        id_user: 2,
        id_events: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 3, 
        id_events: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(process.env.TABLE_USER_EVENTS, null, {});
  }
};
