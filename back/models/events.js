'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Events.init({
    name: DataTypes.STRING,
    des: DataTypes.STRING,
    date: DataTypes.DATE,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    public: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Events',
    tableName: process.env.TABLE_EVENTS
  });
  return Events;
};