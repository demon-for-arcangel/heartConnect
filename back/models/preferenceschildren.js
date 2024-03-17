'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreferencesChildren extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PreferencesChildren.init({
    id_preferences: DataTypes.INTEGER,
    id_children: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PreferencesChildren',
    tableName: process.env.TABLE_PREFERENCES_CHILDREN
  });
  return PreferencesChildren;
};