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
      console.error('Error al obtener la lista de usuarios: ', error);
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
      console.error('Error al obtener el usuario: ', error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await models.User.findOne({
        where: {
          email: email
        }
      });
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      console.error('Error al obtener el usuario por email: ', error);
      throw error;
    }
  }
}

module.exports = UserModel;