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

module.exports = {
    index, getEventsById
}