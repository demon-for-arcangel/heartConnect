'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user'
      });
      this.belongsTo(models.User, {
        foreignKey: 'id_userLike',
        as: 'userLike'
      });
    }
  }
  userLikes.init({
    id_user: DataTypes.INTEGER,
    id_userLike: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userLikes',
    tableName: process.env.TABLE_USER_LIKE
  });
  return userLikes;
};