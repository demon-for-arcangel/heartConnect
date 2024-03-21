'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Rol, {
        through: models.UserRols,
        foreignKey: "id_user",
        otherKey: "id_rol",
        as: "roles",
        onDelete: "CASCADE",
      });

      this.belongsToMany(models.Asset, {
        through: models.UserAssets,
        foreignKey: "id_user",
      });

      this.hasOne(models.Asset, {
        foreignKey: "id",
        sourceKey: "photo_profile",
        as: "image",
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photo_profile: DataTypes.INTEGER,
    born_date: DataTypes.DATE,
    domicile: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
    tableName: process.env.TABLE_USERS,
  });
  return User;
};