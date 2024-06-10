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
      const events = await conx.getEventById(eventId);
   
      res.status(200).json(events);
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

const getActiveEvents = async (req, res) => {
  console.log('Controlador getActiveEvents llamado');
  try {
    const activeEvents = await conx.getActiveEvents();
    console.log('Eventos activos obtenidos:', activeEvents);
    res.status(200).json(activeEvents);
  } catch (error) {
    console.error('Error al obtener eventos activos', error);
    res.status(500).json({ msg: "Error al obtener eventos activos" });
  }
};

const getInactiveEvents = async (req, res) => {
  try {
    const inactiveEvents = await conx.getInactiveEvents();
    res.status(200).json(inactiveEvents);
  } catch (error) {
    console.error('Error al obtener eventos inactivos', error);
    res.status(500).json({ msg: "Error al obtener eventos inactivos" });
  }
};

const activateEvents = async (req, res) => {
  const { eventsIds } = req.body;
  console.log(eventsIds)
  try {
    const updatedEvents = await conx.activateEvents(eventsIds);
    res.status(200).json({ message: 'Evento activado correctamente', event: updatedEvents });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ message: 'Error al activar el evento', error });
  }
}

const desactivateEvents = async (req, res) => {
  const { eventsIds } = req.body; 
  try {
    const result = await conx.desactivateEvents(eventsIds);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al desactivar el evento: ', error);
    res.status(500).json({ message: 'Error al desactivar el evento', error });
  }
}

const searchEvents = async (req, res) => {
  const { query } = req.params; 

  try {
    const events = await conx.searchEvents(query);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error al buscar eventos:', error);
    res.status(500).json({ msg: "Error al buscar eventos" });
  }
};


module.exports = {
  index, getEventsById, createEvent, updateEvent, deleteEvents, getActiveEvents, getInactiveEvents,
  activateEvents, desactivateEvents, searchEvents
}