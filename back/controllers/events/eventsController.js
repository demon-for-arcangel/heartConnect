const { response, request } = require("express");
const Conexion = require("../../database/events/eventsConnection");
const models = require('../../models');

const conx = new Conexion();

const index = async (req, res) => {
    try{
      const events = await conx.indexEvents();
      res.status(200).json(events);
    }catch (error){
      console.error('Error al obtener los eventos', error);
      res.status(500).json({ msg: "Error"});
    }
  }
  
const getEventsById = async (req, res) => {
    const eventId = req.params.id;
    try {
      const event = await models.Events.findOne({
        where: { id: eventId },
      });
   
      if (!event) {
        return res.status(404).json({ msg: "Evento no encontrado" });
      }
   
      res.status(200).json(event);
    } catch (error) {
      console.error('Error al obtener el evento por ID', error);
      res.status(500).json({ msg: "Error" });
    }
};

const createEvent = async (req, res) => {
  const eventData = req.body;
  try {
      const newEvent = await conx.createEvent(eventData);
      if (!newEvent) {
          return res.status(400).json({ msg: "No se pudo crear el evento" });
      }
      res.status(201).json(newEvent);
  } catch (error) {
      console.error('Error al crear el evento: ', error);
      res.status(500).json({ msg: "Error al crear el evento" });
  }
};

module.exports = {
    index, getEventsById, createEvent
}