'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Chat, {
        foreignKey: 'chatId',
        as: 'chat'
      });
      this.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'sender'
      })
    }
  }
  Message.init({
    chatId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    senderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
    tableName: process.env.TABLE_MESSAGE
  });
  return Message;
};