'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserEvents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserEvents.init({
    id_user: DataTypes.INTEGER,
    id_rol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserEvents',
    tableName: process.env.TABLE_USER_EVENTS
  });
  return UserEvents;
};