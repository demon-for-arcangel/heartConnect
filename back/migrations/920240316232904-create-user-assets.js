'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_USER_ASSETS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_USERS   
          },
          key: 'id'
        }
      },
      id_asset: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_ASSETS   
          },
          key: 'id'
        }
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
    await queryInterface.dropTable(process.env.TABLE_USER_ASSETS);
  }
};