'use strict';

const { userRolFactory } = require('../factories/userRolFactory');
const models = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up (queryInterface, Sequelize) {
    try {
      const adminUser = await models.User.findOne({ where: { email: 'admin@heartconnect.com' }});
      const user = await models.User.findOne({ where: { email: 'user@heartconnect.com' }});

      const adminRole = await models.Rol.findOne({ where: { id: process.env.ID_ROL_ADMIN }});
      const userRole = await models.Rol.findOne({ where: { id: process.env.ID_ROL_USER }});

      if (adminUser && adminRole) {
        await adminUser.setRoles([adminRole]); 
      }

      if (user && userRole) {
        await user.setRoles([userRole]); 
      }
    } catch(error) {
      console.error(error);
    }

    let factoryUserRols = await userRolFactory(21);
    await queryInterface.bulkInsert(process.env.TABLE_USER_ROLS, factoryUserRols);
 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_USER_ROLS, null, {});
  }
};