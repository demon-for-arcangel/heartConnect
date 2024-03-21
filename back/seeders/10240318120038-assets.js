'use strict';

const { assetsFactory } = require('../factories/assetsFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let arrPhotos = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

    let photos_profile = await assetsFactory(arrPhotos)
    await queryInterface.bulkInsert(process.env.TABLE_ASSETS, photos_profile);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_ASSETS, null, {})
  }
};
