'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRols extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRols.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user'
      });
      UserRols.belongsTo(models.Rol, {
        foreignKey: 'id_rol',
        as: 'rol'
      });
    }
  }
  
  UserRols.init({
    id_user: DataTypes.NUMBER,
    id_rol: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'UserRols',
    tableName: process.env.TABLE_USER_ROLS,
  });
  return UserRols;
};