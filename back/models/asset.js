'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.UserAssets,
        foreignKey:'id_asset'
      });

      this.hasOne(models.User, {
        foreignKey: 'photo_profile',
        as: 'image'
     });
    }
  }
  Asset.init({
    firsName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Asset',
    tableName: process.env.TABLE_ASSETS
  });
  return Asset;
};