require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../../database/events/userEventsConnection");

const conx = new Conexion();

const getInscriptionsById = async (req, res) => {
  const eventId = req.params.id;
  try {
    const inscripciones = await conx.getInscriptionsById(eventId);

    if (!inscripciones) {
      return res.status(404).json({ msg: "Inscripciones no encontradas" });
    }

    res.status(200).json(inscripciones);
  } catch (error) {
    console.error('Error al obtener las inscripciones por el ID del evento', error);
    res.status(500).json({ msg: "Error" });
  }
}

const createInscription = async (req, res) => {
  const { userId, eventId } = req.body;  
console.log(userId, eventId)

  try {
    const newInscription = await conx.createInscription(userId, eventId);
    console.log(newInscription)
    res.status(201).json(newInscription);
  } catch (error) {
    console.error('Error al crear la inscripcion: ', error);
    res.status(500).json({ error: 'Error al crear la inscripcion' });
  }
}

const deleteInscription = async (req, res) => {
  const inscriptionsIds = req.params.id;
  try {
    const result = await conx.deleteInscription(inscriptionsIds);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al eliminar las inscripciones: ', error);
    res.status(500).json({ msg: "Error al eliminar las inscripciones" });
  }
}

module.exports = {
  getInscriptionsById, createInscription, deleteInscription,
};
