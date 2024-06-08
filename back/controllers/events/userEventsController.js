require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

class UserEventsModel {
  constructor() {}

  async getInscriptionsById(id) {
    
  }

  async createInscription(eventData) {
    
  }

  async deleteInscription(ids) {
    
  }
}

module.exports = UserEventsModel;