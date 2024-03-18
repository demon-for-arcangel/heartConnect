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
    desc: DataTypes.STRING,
    date: DataTypes.DATE,
    public: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Events',
    tableName: processd.env.TABLE_EVENTS
  });
  return Events;
};