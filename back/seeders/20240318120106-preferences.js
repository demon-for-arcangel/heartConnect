'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(process.env.TABLE_PREFERENCES, [
      {
        sports: 'Football',
        artistic: 'Painting',
        politicians: 'Democrat',
        relationship_type: 'seria',
        has_children: false,
        wants_children: true,
        interest: 'mujeres',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sports: 'Basketball',
        artistic: 'Sculpture',
        politicians: 'Republican',
        relationship_type: 'esporádica',
        has_children: true,
        wants_children: false,
        interest: 'ambos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(process.env.TABLE_PREFERENCES, null, {});
  }
};