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
      this.belongsTo(models.PreferencesRelation, {
        foreignKey: 'id',
      });
      this.belongsTo(models.PreferencesInterest, {
        foreignKey: 'id',
      });
      this.belongsToMany(models.User, {
        through: models.UserPreferences,
        foreignKey: 'id_preferences',
        otherKey: 'id_user',
        as: 'users'
      });
    }
  }
  Preferences.init({
    sports: DataTypes.NUMBER,
    artistic: DataTypes.NUMBER,
    politicians: DataTypes.NUMBER,
    relationship_type: DataTypes.NUMBER,
    has_children: DataTypes.BOOLEAN,
    wants_children: DataTypes.BOOLEAN,
    interest: DataTypes.NUMBER,
    sum_preferences: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Preferences',
    tableName: process.env.TABLE_PREFERENCES
  });
  return Preferences;
};