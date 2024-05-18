'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Message, {
        foreignKey: 'chatId',
        as: 'messages'
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      this.belongsTo(models.User, {
        foreignKey: 'friendId', as: 'friend',
      })
    }
  }
  Chat.init({
    userId: DataTypes.INTEGER,
    accepted: DataTypes.BOOLEAN,
    friendId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: process.env.TABLE_CHAT,
  });
  return Chat;
};