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
        avg_preferences: 37,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sports: 12,
        artistic: 30,
        politicians: 70,
        relationship_type: 1, 
        has_children: false,
        wants_children: true,
        interest: 1, 
        avg_preferences: 37,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sports: 3,
        artistic: 20,
        politicians: 40,
        relationship_type: 1, 
        has_children: false,
        wants_children: true,
        interest: 1, 
        avg_preferences: 21,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sports: 12,
        artistic: 30,
        politicians: 70,
        relationship_type: 1, 
        has_children: false,
        wants_children: true,
        interest: 1, 
        avg_preferences: 37,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sports: 12,
        artistic: 30,
        politicians: 70,
        relationship_type: 1, 
        has_children: false,
        wants_children: true,
        interest: 1, 
        avg_preferences: 37,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sports: 12,
        artistic: 30,
        politicians: 70,
        relationship_type: 1, 
        has_children: false,
        wants_children: true,
        interest: 1, 
        avg_preferences: 37,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_PREFERENCES, null, {});
  }
};