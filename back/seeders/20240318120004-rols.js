'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_ROLS, [
      {
        id: process.env.ID_ROL_ADMIN,
        name: "administrador",
        desc: "Administrador de toda la aplicación."
      },
      {
        id: process.env.ID_ROL_USER,
        name: "usuario",
        desc: "Usuario normal que disfruta de la aplicación."
      }
    ],
    {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_ROLS, null, {});
  }
};
