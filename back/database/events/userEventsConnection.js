require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

class UserEventsModel {
  constructor() {}

  async getInscriptionsById(id) {
    try {
      const event = await models.UserEvents.findAll({ where: { id_events: id } });
      if (!event) {
        throw new Error('Inscripciones no encontradas');
      }
      return event;
    } catch (error) {
      console.error('Error al mostrar las inscripciones: ', error);
      throw error;
    }
  }

  async getInscriptionByUserAndEvent(userId, eventId) {
    try {
      const inscription = await models.UserEvents.findOne({ where: { id_user: userId, id_events: eventId } });
      return inscription;
    } catch (error) {
      console.error('Error al obtener la inscripción del usuario por el evento:', error);
      throw error;
    }
  }  

  async createInscription(userId, eventId) {
    try {
      const existingInscription = await models.UserEvents.findOne({
        where: { id_user: userId, id_events: eventId }
      });
  
      if (existingInscription) {
        return existingInscription;
      }
  
      const newInscription = await models.UserEvents.create({ id_user: userId, id_events: eventId });
      return newInscription;
    } catch (error) {
      console.error('Error al crear la inscripción: ', error);
      throw error;
    }
  }

  async deleteInscription(id) {
    try {
      const deletedInscriptions = await models.UserEvents.destroy({
        where: { id: id }
      });
      if (deletedInscriptions === 0) {
        throw new Error('Ninguna inscripción encontrada o eliminada');
      }
      return { message: `${deletedInscriptions} inscripciones eliminadas correctamente` };
    } catch (error) {
      console.error('Error al eliminar las inscripciones: ', error);
      throw error;
    }
  }
}

module.exports = UserEventsModel;
