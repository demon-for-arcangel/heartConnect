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
      {
        id_user: 4,
        id_preferences: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 5,
        id_preferences: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 6,
        id_preferences: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 7,
        id_preferences: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_USER_PREFERENCES, null, {});
  }
};
