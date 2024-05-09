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

const updateEvent = async (req, res) => {
  const eventId = req.params.id; 
  const updatedData = req.body; 
  try {
    const updatedEvent = await conx.updateEvent(eventId, updatedData);
    if (!updatedEvent) {
        return res.status(400).json({ msg: "No se pudo actualizar el evento" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error al actualizar el evento: ', error);
    res.status(500).json({ msg: "Error al actualizar el evento" });
  }
};

const deleteEvents = async (req, res) => {
  const eventIds = req.body.ids; 
  try {
    const result = await conx.deleteEvents(eventIds);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al eliminar los eventos: ', error);
    res.status(500).json({ msg: "Error al eliminar los eventos" });
  }
};

module.exports = {
    index, getEventsById, createEvent, updateEvent, deleteEvents
}