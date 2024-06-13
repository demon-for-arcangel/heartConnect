'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPeopleInterest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'personId',
        as: 'userLike'
      });
    }
  }
  UserPeopleInterest.init({
    userId: DataTypes.INTEGER,
    personId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserPeopleInterest',
  });
  return UserPeopleInterest;
};