'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_PREFERENCES, [
      {
        sports: 12,
        artistic: 30,
        politicians: 70,
        relationship_type: 1, 
        has_children: false,
        wants_children: true,
        interest: 1, 
        sum_preferences: 112,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sports: 40,
        artistic: 85,
        politicians: 60,
        relationship_type: 2,
        has_children: true,
        wants_children: false,
        interest: 3, 
        sum_preferences: 185,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_PREFERENCES, null, {});
  }
};