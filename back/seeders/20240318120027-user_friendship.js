'use strict';

module.exports = {
 async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_USER_FRIENDSHIP, [
      {
        id_user: 3, 
        id_friendship: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 2, 
        id_friendship: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_USER_FRIENDSHIP, null, {});
  }
};
