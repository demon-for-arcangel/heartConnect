'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_USER_ROLS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
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
      id_rol: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_ROLS
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
    await queryInterface.dropTable(process.env.TABLE_USER_ROLS);
  }
};