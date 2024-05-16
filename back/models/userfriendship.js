'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFriendShip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'id_friendship',
        as: 'friend'
      });
    }
  }
  UserFriendShip.init({
    id_user: DataTypes.NUMBER,
    id_friendship: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'UserFriendShip',
    tableName: process.env.TABLE_USER_FRIENDSHIP
  });
  return UserFriendShip;
};