'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_PREFERENCES_INTEREST, [
      {
        gender: 'Mujeres', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gender: 'Hombres',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gender: 'Ambos',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_PREFERENCES_INTEREST, null, {});
  }
};
