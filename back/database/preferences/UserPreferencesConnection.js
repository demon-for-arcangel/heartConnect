const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

class UserPreferencesModel {
    constructor() {}

    async indexPreferences(userId) {
        try {
            const userPreferences = await models.UserPreferences.findAll({
                where: {
                    userId: userId
                },
                include: [models.Preferences]
            });
            return userPreferences;
        } catch (error) {
            console.error('Error al mostrar las preferencias del usuario: ', error);
            throw error;
        }
    }

    async getPreferenceById(userId) {
        try {
            // Busca el usuario y su preferencia asociada
            const userPreference = await models.UserPreferences.findOne({
                where: {
                    userId: userId
                }
            });
    
            // Si no se encuentra la preferencia del usuario, devuelve null
            if (!userPreference) {
                return null;
            }
    
            // Encuentra la preferencia en la tabla de preferencias
            const preference = await models.Preferences.findByPk(userPreference.id_preferences);
    
            // Devuelve la preferencia encontrada
            return preference;
        } catch (error) {
            console.error('Error al mostrar la preferencia por su ID', error);
            throw error;
        }
    }
    

    async createPreference(userId, preferencesData) {
        try {
            const newUserPreference = await models.UserPreferences.create({
                userId: userId,
                preferenceId: preferencesData.preferenceId
                // Añade más campos si es necesario
            });
            return newUserPreference;
        } catch (error) {
            console.error('Error al crear la preferencia: ', error);
            throw error;
        }
    }

    async updatePreference(userId, preferenceId, preferencesData) {
        try {
            const updatedUserPreference = await models.UserPreferences.update(preferencesData, {
                where: {
                    userId: userId,
                    preferenceId: preferenceId
                }
            });
            return updatedUserPreference;
        } catch (error) {
            console.error('Error al actualizar la preferencia: ', error);
            throw error;
        }
    }
    
    async deletePreference(userId, preferenceId) {
        try {
            const deletedUserPreference = await models.UserPreferences.destroy({
                where: {
                    userId: userId,
                    preferenceId: preferenceId
                }
            });
            return deletedUserPreference;
        } catch (error) {
            console.error('Error al eliminar la preferencia: ', error);
            throw error;
        }
    }
}

module.exports = UserPreferencesModel;
