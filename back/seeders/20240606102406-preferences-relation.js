'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_PREFERENCES_RELATION, [
      {
        type: 'Seria', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Esporádica',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_PREFERENCES_RELATION, null, {});
  }
};
