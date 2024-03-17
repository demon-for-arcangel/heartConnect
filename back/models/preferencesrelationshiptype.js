'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreferencesRelationshipType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PreferencesRelationshipType.init({
    id_preferences: DataTypes.INTEGER,
    id_relationship: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PreferencesRelationshipType',
    tableName: process.env.TABLE_PREFERENCES_RELATIONSHIP
  });
  return PreferencesRelationshipType;
};