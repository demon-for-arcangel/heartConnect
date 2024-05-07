require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

class EventsModel {
    constructor() {}

    async indexEvents() {
        try {
            const events = await models.Events.findAll();
            return events;
          }catch (error){
            console.error('Error al mostrar la lista de eventos: ', error);
            throw error;
        }
    }

    async getEventById(id) {
        try {
          const event = await models.Events.findByPk(id);
          if (!event) {
            throw new Error('Evento no encontrado');
          }
          return event;
        } catch (error){
          console.error('Error al mostrar el evento: ', error);
          throw error;
        }
    }

  async createEvent(eventData) {
    try {
        const newEvent = await models.Events.create(eventData);
        if (!newEvent) {
            throw new Error('No se pudo crear el evento');
        }
        return newEvent;
    } catch (error) {
        console.error('Error al crear el evento: ', error);
        throw error;
    }
  }

  updateEvent = async () => {}

  deleteEvent = async () => {}
}

module.exports = EventsModel;