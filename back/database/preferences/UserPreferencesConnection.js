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
            const userPreference = await models.UserPreferences.findOne({
                where: {
                    userId: userId
                }
            });
    
            if (!userPreference) {
                return null;
            }
    
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
                id_user: userId,
                id_preferences: preferencesData.preferenceId
            });
            return newUserPreference;
        } catch (error) {
            console.error('Error al crear la preferencia: ', error);
            throw error;
        }
    }

    async updatePreference(userId, preferencesData) {
        try {
            const userPreference = await models.UserPreferences.findOne({
                where: { id_user: userId }
            });

            if (!userPreference) {
                console.error(`No se encontraron preferencias para el usuario con ID: ${userId}`);
                throw new Error('Preferencias no encontradas');
            }

            console.log(`Preferencia encontrada para el usuario: ${JSON.stringify(userPreference)}`);

            // Actualizar las preferencias del usuario
            const updatedPreference = await models.Preferences.update(preferencesData, {
                where: { id: userPreference.id_preferences }
            });

            // Verificar si la preferencia fue actualizada
            if (updatedPreference[0] === 0) {
                console.error(`Preferencia con ID: ${userPreference.id_preferences} no encontrada para actualización`);
                throw new Error('Preferencia no encontrada para este usuario');
            }

            console.log(`Preferencia actualizada: ${JSON.stringify(updatedPreference)}`);

            return updatedPreference;
        } catch (error) {
            console.error('Error al actualizar las preferencias: ', error);
            throw error;
        }
    }

    async deletePreference(userId) {
        try {
            console.log(`Buscando preferencias para el usuario con ID: ${userId}`);
    
            const userPreference = await models.UserPreferences.findOne({
                where: { id_user: userId }
            });
    
            if (!userPreference) {
                console.error(`No se encontraron preferencias para el usuario con ID: ${userId}`);
                throw new Error('Preferencias no encontradas');
            }
    
            console.log(`Encontrada preferencia con ID: ${userPreference.id_preferences} para el usuario con ID: ${userId}`);
    
            await models.UserPreferences.destroy({
                where: { id_user: userId }
            });
    
            console.log(`Preferencias del usuario con ID: ${userId} eliminadas de la tabla UserPreferences`);
    
            // Luego, eliminar la preferencia de la tabla Preferences
            const deletedPreference = await models.Preferences.destroy({
                where: { id: userPreference.id_preferences }
            });
    
            if (deletedPreference === 0) {
                console.error(`No se encontraron preferencias en la tabla Preferences con ID: ${userPreference.id_preferences}`);
                throw new Error('Preferencias no encontradas en la tabla Preferences');
            }
    
            console.log(`Preferencia con ID: ${userPreference.id_preferences} eliminada de la tabla Preferences`);
            return deletedPreference;
        } catch (error) {
            console.error('Error al eliminar la preferencia: ', error);
            throw error;
        }
    }   
}

module.exports = UserPreferencesModel;
