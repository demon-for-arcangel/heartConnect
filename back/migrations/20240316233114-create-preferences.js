'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_PREFERENCES, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sports: {
        type: Sequelize.STRING
      },
      artistic: {
        type: Sequelize.STRING
      },
      politicians: {
        type: Sequelize.STRING
      },
      relationship_type: {
        type: Sequelize.STRING // Campo para indicar el tipo de relación: seria o esporádica
      },
      has_children: {
        type: Sequelize.BOOLEAN, // Campo para indicar si tiene hijos
        defaultValue: false // Valor predeterminado: no tiene hijos
      },
      wants_children: {
        type: Sequelize.BOOLEAN // Campo para indicar si quiere tener hijos en el futuro
      },
      interest: {
        type: Sequelize.STRING // Campo para indicar interés: hombre, mujeres o ambos
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(process.env.TABLE_PREFERENCES);
  }
};