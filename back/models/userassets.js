'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAssets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        foreignKey:'id_user'
      });
      this.belongsToMany(models.Asset, {
        foreignKey:'id_assets'
      });
    }
  }
  UserAssets.init({
    id_user: DataTypes.INTEGER,
    id_assets: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserAssets',
    tableName: process.env.TABLE_USER_ASSETS
  });
  return UserAssets;
};