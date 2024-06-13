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
      desc: 'descripcion de admin',
      photo_profile: 1,
      born_date: new Date('2000-01-01'),
      domicile: '403691.30310115 4282638.6555873',
      phone_number: '666 66 66 66',
      gender: 'Hombre',
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
      desc: 'descripcion de user',
      photo_profile: 1,
      born_date: new Date('2000-01-01'),
      domicile: '403691.30310115 4282638.6555873',
      phone_number: '666 66 66 66',
      active: true,
      gender: 'Mujer',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      firstName: 'marina',
      lastName: 'laguna',
      email: 'marinalaguna2004@gmail.com',
      password: await bcrypt.hash('1234', 10),
      desc: 'descripcion',
      photo_profile: 1,
      born_date: new Date('2004-06-22'),
      domicile: '403691.30310115 4282638.6555873',
      phone_number: '666 66 66 66',
      active: true,
      gender: 'Mujer',
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ], {});

   let factoryUser = await userFactory(20)
   await queryInterface.bulkInsert(process.env.TABLE_USERS, factoryUser, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_USERS, null, {})
  }
};
