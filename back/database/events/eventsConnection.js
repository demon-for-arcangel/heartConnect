require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

class EventsModel {
    constructor() {}

    async indexEvents() {
        try {
            const events = await models.indexEvents.findAll();
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

    createEvent = async () => {}

    updateEvent = async () => {}

    deleteEvent = async () => {}
}