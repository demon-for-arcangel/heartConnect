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
        throw new Error('ooEvento no encontrado');
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

  async updateEvent(id, updatedData) {
    try {
      const event = await models.Events.findByPk(id);
      if (!event) {
        throw new Error('sssEvento no encontrado');
      }

      const updatedEvent = await event.update(updatedData);
      if (!updatedEvent) {
        throw new Error('No se pudo actualizar el evento');
      }

      return updatedEvent;
    } catch (error) {
      console.error('Error al actualizar el evento: ', error);
      throw error;
    }
  }

  async deleteEvents(ids) {
    try {
      const deletedEvents = await models.Events.destroy({
        where: { id: ids }
      });
      if (deletedEvents === 0) {
        throw new Error('Ningún evento encontrado o eliminado');
      }
      return { message: `${deletedEvents} eventos eliminados correctamente` };
    } catch (error) {
      console.error('Error al eliminar los eventos: ', error);
      throw error;
    }
  }

  async getActiveEvents() {
    try {
      console.log('Función getActiveEvents llamada en el modelo');
      const activeEvents = await models.Events.findAll({
        where: {
          public: 1
        }
      });
      console.log('Eventos activos:', activeEvents);
      return activeEvents;
    } catch (error) {
      console.error('Error al mostrar los eventos activos: ', error);
      throw error;
    }
  }
  
  getInactiveEvents = async () => {
    try {
      const inactiveEvents = await models.Events.findAll({
        where: {
          public: 0
        }
      }); 
      return inactiveEvents;
    } catch (error) {
      console.error('Error al mostrar los eventos inactivos: ', error);
      throw error;
    }
  }

  activateEvents = async (eventsIds) => {
    try {
      if (!Array.isArray(eventsIds) || eventsIds.length === 0) {
         throw new Error('No se proporcionaron IDs de los eventos.');
      }
   
      const updatedEvents = await models.Events.update(
         { public: 1 },
         { where: { id: eventsIds } } 
      );
   
      return { message: `${updatedEvents} eventos activados.` };
    } catch (error) {
      console.error('Error al activar los eventos: ', error);
      throw error;
    }
  }

  desactivateEvents = async (eventsIds) => {
    try {
      if (!Array.isArray(eventsIds) || eventsIds.length === 0) {
        throw new Error('No se proporcionaron IDs de los eventos.');
      }

      const updatedEvents = await models.Events.update(
        { public: 0 },
        { where: { id: eventsIds } } 
      );
  
      return { message: `${updatedEvents} eventos desactivados.` };
    } catch (error) {
      console.error('Error al desactivar los eventos: ', error);
      throw error;
    }
  }

  async searchEvents(term) {
    try {
      const events = await models.Events.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${term}%` } },
            { des: { [Op.like]: `%${term}%` } },
/*             { location: { [Op.like]: `%${term}%` } }
 */          ]
        }
      });
      return events;
    } catch (error) {
      console.error('Error al buscar eventos:', error);
      throw error;
    }
  }
}

module.exports = EventsModel;