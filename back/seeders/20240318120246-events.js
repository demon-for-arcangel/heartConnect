'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_EVENTS, [
      {
        name: 'Evento 1',
        des: 'Descripción del Evento 1',
        date: new Date(),
        public: 1,
        latitude: 38.728796, 
        longitude: -4.078738,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Evento 2',
        des: 'Descripción del Evento 2',
        date: new Date(),
        public: 0,
        latitude: 38.735575,
        longitude: -4.073282,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Evento 3',
        des: 'Descripción del Evento 3',
        date: new Date('2026-06-13T00:00:00'),
        public: 0,
        latitude: 38.735575,
        longitude: -4.073282,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_EVENTS, null, {});
  }
};
