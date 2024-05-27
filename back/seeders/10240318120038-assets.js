'use strict';

const { assetsFactory } = require('../factories/assetsFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let arrPhotos = ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png'];

    let photos_profile = await assetsFactory(arrPhotos)
    await queryInterface.bulkInsert(process.env.TABLE_ASSETS, photos_profile);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_ASSETS, null, {})
  }
};