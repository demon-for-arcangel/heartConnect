'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_USER_PREFERENCES, [
      {
        id_user: 2, 
        id_preferences: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 3, 
        id_preferences: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_USER_PREFERENCES, null, {});
  }
};
