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
        type: Sequelize.STRING 
      },
      has_children: {
        type: Sequelize.BOOLEAN, 
        defaultValue: false
      },
      wants_children: {
        type: Sequelize.BOOLEAN 
      },
      interest: {
        type: Sequelize.STRING 
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