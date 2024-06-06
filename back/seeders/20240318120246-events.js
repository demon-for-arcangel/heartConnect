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
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Evento 2',
        des: 'Descripción del Evento 2',
        date: new Date(),
        public: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_EVENTS, null, {});
  }
};
