'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreferencesInterest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PreferencesInterest.hasMany(models.Preferences, {
        foreignKey: 'id',
      });
    }
  }
  PreferencesInterest.init({
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PreferencesInterest',
    tableName: process.env.TABLE_PREFERENCES_INTEREST
  });
  return PreferencesInterest;
};