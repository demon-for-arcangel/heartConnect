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
}

module.exports = UserModel;