'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_PREFERENCES, [
      {
        sports: 'Football',
        artistic: 'Painting',
        politicians: 'Democrat',
        relationship_type: 1, 
        has_children: false,
        wants_children: true,
        interest: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sports: 'Basketball',
        artistic: 'Sculpture',
        politicians: 'Republican',
        relationship_type: 2,
        has_children: true,
        wants_children: false,
        interest: 3, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_PREFERENCES, null, {});
  }
};