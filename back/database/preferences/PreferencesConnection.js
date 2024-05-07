require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

class PreferencesModel {
    constructor() {}
    
    async indexPreferences() {
        try {
            const preferences = await models.Preferences.findAll();
            return preferences;
        } catch (error) {
            console.error('Error al mostrar las preferencias de los usuarios: ', error);
            throw error;
        }
    }
}

module.exports = PreferencesModel;