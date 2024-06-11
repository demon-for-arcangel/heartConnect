'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserPeopleInterests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_USERS          
          },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      personId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_USERS          
          },
          key: 'id'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('UserPeopleInterests');
  }
};