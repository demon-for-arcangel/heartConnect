'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPreferences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserPreferences.init({
    id_user: DataTypes.INTEGER,
    id_preferennces: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserPreferences',
    tableName: process.env.TABLE_USER_PREFERENCES
  });
  return UserPreferences;
};