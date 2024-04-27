require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

class UserModel {
  constructor() {}
    
  async indexUsers() {
    try {
      const users = await models.User.findAll();
      return users;
    }catch (error){
      console.error('Error getting user list: ', error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await models.User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error){
      console.error('Error getting user: ', error);
      throw error;
    }
  }

  async getUserByEmail(email, userData) {
    try {
       let user = await models.User.findOne({
         where: {
           email: email
         }
       });
       
       return user;
    } catch (error) {
       console.error('Error al obtener o crear usuario por email:', error);
       throw error;
    }
}


  async registerUser(userData) {
    try {
        console.log('datos del nuevo: ', userData);
        if (!userData || typeof userData !== 'object') {
            throw new Error('Datos de usuario inválidos');
        }

        const newUser = await models.User.create(userData);

        if (!newUser) {
            throw new Error('No se pudo crear el usuario');
        }

        return newUser;
    } catch (error) {
        console.error('Error al registrar un nuevo usuario:', error);
        throw error;
    }
  }

  createUserRols = async (userId, arrRolsId) => {
    let newRoles = [];
    try {
      conexion.conectar();
      for (let rol of arrRolsId) {
        let newRole = await models.UserRol.create({
          id_user: userId,
          id_rol: rol.id,
        });
        newRoles.push(newRole);
      }
    } catch (error) {
      throw error;
    } finally {
      conexion.desconectar();
    }
    return newRoles;
  };

  updateUser = async (userId, newData) => {
    try {
      const user = await models.User.findByPk(userId);
      if (!user) {
        throw new Error('User nor found.');
      }

      const updated = await user.update(newData);
      return updated;
    }catch (error) {
      console.error('Error al actualizar el usuario: ', error);
      throw error;
    }
  }

  deleteUser = async (userId) => {
    try {
      const user = await models.User.findByPk(userId);
      if (!user){
        throw new Error('User not found.');
      }

      await user.destroy();

      return { message: 'User deleted.' };
    } catch (error) {
      console.error('Error deleting user.');
      throw error;
    }
  }

  logout = async (userId) => {
    try {
      await Token.destroy({ where: { userId } });
      return true;
    } catch (error) {
      console.error('Error al eliminar el token:', error);
      return false;
    }
  }
}

module.exports = UserModel;