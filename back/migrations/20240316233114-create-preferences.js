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
        type: Sequelize.INTEGER
      },
      artistic: {
        type: Sequelize.INTEGER
      },
      politicians: {
        type: Sequelize.INTEGER
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
      avg_preferences: {
        type: Sequelize.INTEGER
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