'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preferences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Preferences.init({
    sports: DataTypes.STRING,
    artistic: DataTypes.STRING,
    politicians: DataTypes.STRING,
    relationship_type: DataTypes.STRING,
    has_children: DataTypes.BOOLEAN,
    wants_children: DataTypes.BOOLEAN,
    interest: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Preferences',
    tableName: process.env.TABLE_PREFERENCES
  });
  return Preferences;
};