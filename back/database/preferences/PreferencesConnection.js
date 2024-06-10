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

    async getPreferenceById(id) {
        try {
            const preferences = await models.Preferences.findByPk(id);
            if (!preferences) {
                throw new Error('Preferencias no encontradas');
            }
            return preferences;
        } catch (error) {
            console.error('Error al mostrar las preferencias de ese id', error);
            throw error;
        }
    }

    async createPreference(preferencesData) {
        try {
            const newPreference = await models.Preferences.create(preferencesData);
            return newPreference;
        } catch (error) {
            console.error('Error al crear las preferencias: ', error);
            throw error;
        }
    }

    async updatePreference(id, preferencesData) {
        try {
            const existingPreference = await models.Preferences.findByPk(id);
            if (!existingPreference) {
                throw new Error('Preferencias no encontradas');
            }
            await existingPreference.update(preferencesData);
            return existingPreference;
        } catch (error) {
            console.error('Error al actualizar las preferencias: ', error);
            throw error;
        }
    }
    
    async deletePreference(id) {
        try {
            const deletedPreference = await models.Preferences.findByPk(id);
            if (!deletedPreference) {
                throw new Error('Preferencias no encontradas');
            }
            await deletedPreference.destroy();
            return { msg: 'Preferencias eliminadas exitosamente' };
        } catch (error) {
            console.error('Error al eliminar las preferencias: ', error);
            throw error;
        }
    }
    


    async getOptionsRelation() {
        try {
            const relationOptions = await models.PreferencesRelation.findAll({
                attributes: ['id', 'type']
            });
            return relationOptions;
        } catch (error) {
            console.error('Error al obtener las opciones de tipo de relación: ', error);
            throw error;
        }
    }

    async getOptionsInterest() {
        try {
            const interestOptions = await models.PreferencesInterest.findAll({
                attributes: ['id', 'gender']
            });
            return interestOptions;
        } catch (error) {
            console.error('Error al obtener las opciones de interés: ', error);
            throw error;
        }
    }
}

module.exports = PreferencesModel;
