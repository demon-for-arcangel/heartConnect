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
        foreignKey: 'id_user',
        as: 'assets'
      });
      this.hasOne(models.Asset, {
        as: 'photoProfile',
        foreignKey: 'photo_profile'
      });

      /* this.belongsToMany(models.Rol, {
        through: 'user_rols',
        as: 'roles',
       }); */

       this.hasMany(models.UserFriendShip, {
        foreignKey: 'id_user',
        as: 'friendships'
      });

      this.hasMany(models.UserFriendShip, {
        foreignKey: 'id_friendship',
        as: 'friendOf'
      });

      // Alias para la asociación con Chat como usuario
      this.hasMany(models.Chat, {
        foreignKey: 'userId',
        as: 'chatsAsUser'
      });

      // Alias para la asociación con Chat como amigo
      this.hasMany(models.Chat, {
        foreignKey: 'friendId',
        as: 'chatsAsFriend'
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    desc: DataTypes.TEXT,
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