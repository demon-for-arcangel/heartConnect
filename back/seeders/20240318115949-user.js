'use strict';

const { QueryInterface } = require('sequelize');
const { userFactory } = require('../factories/userFactory');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert(process.env.TABLE_USERS, [
    {
      id: 1,
      firstName: 'admin',
      lastName: 'admin1',
      email: 'admin@heartconnect.com',
      password: await bcrypt.hash('1234', 10),
      photo_profile: 1,
      born_date: new Date('2000-01-01'),
      domicile: '403691.30310115 4282638.6555873',
      phone_number: '666 66 66 66',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      firstName: 'user',
      lastName: 'user1',
      email: 'user@heartconnect.com',
      password: await bcrypt.hash('1234', 10),
      photo_profile: 1,
      born_date: new Date('2000-01-01'),
      domicile: '403691.30310115 4282638.6555873',
      phone_number: '666 66 66 66',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      firstName: 'user',
      lastName: 'user2',
      email: 'user2@heartconnect.com',
      password: await bcrypt.hash('1234', 10),
      photo_profile: 1,
      born_date: new Date('2000-01-01'),
      domicile: '403691.30310115 4282638.6555873',
      phone_number: '666 66 66 66',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ], {});

   let factoryUser = await userFactory(10)
   await QueryInterface.bulkInsert(process.env.TABLE_USERS, factoryUser, {})
 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_USERS, null, {})
  }
};
