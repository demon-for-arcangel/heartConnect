'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(process.env.TABLE_EVENTS, [
      {
        name: 'Evento 1',
        des: 'Descripción del Evento 1',
        date: new Date(),
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Evento 2',
        des: 'Descripción del Evento 2',
        date: new Date(),
        public: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(process.env.TABLE_EVENTS, null, {});
  }
};
