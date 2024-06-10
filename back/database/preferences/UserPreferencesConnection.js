const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

class UserPreferencesModel {
    constructor() {}

    async indexUserPreferences(userId) {
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

    async getUserPreferenceById(userId) {
        try {
            const userPreference = await models.UserPreferences.findOne({
                where: {
                    id_user: userId
                }
            });

            if (!userPreference) {
                return null;
            }

            const preference = await models.Preferences.findByPk(userPreference.id_preferences);

            if (!preference) {
                return null;
            }

            return preference;
        } catch (error) {
            console.error('Error al mostrar la preferencia por su ID', error);
            throw error;
        }
    }   

    async createUserPreference(userId, id, preferencesData) {
        try {
            const newUserPreference = await models.UserPreferences.create({
                id_user: userId,
                id_preferences: id
            });
    
            const sum_preferences = preferencesData.sports + preferencesData.artistic + preferencesData.politicians;
    
            const [updateCount, updateRows] = await models.Preferences.update({
                sum_preferences: sum_preferences
            }, {
                where: {
                    id: id 
                }
            });
            
            if (updateCount > 0) {
                console.log(`Se actualizó sum_preferences correctamente para el usuario con ID ${userId}`);
            } else {
                console.log(`No se encontró ninguna fila para actualizar sum_preferences para el usuario con ID ${userId}`);
            }
    
            return newUserPreference;
        } catch (error) {
            console.error('Error al crear o actualizar la preferencia: ', error);
            throw error;
        }
    }
    
    async updateUserPreference(userId, preferencesData) {
        try {
            const userPreference = await models.UserPreferences.findOne({
                where: { id_user: userId }
            });

            if (!userPreference) {
                console.error(`No se encontraron preferencias para el usuario con ID: ${userId}`);
                throw new Error('Preferencias no encontradas');
            }

            console.log(`Preferencia encontrada para el usuario: ${JSON.stringify(userPreference)}`);

            const updatedPreference = await models.Preferences.update(preferencesData, {
                where: { id: userPreference.id_preferences }
            });

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

    async deleteUserPreference(userId) {
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

    /*-------- Sacar las posibles opciones de tipo de relacion y el tipo de interes ---------- */
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

module.exports = UserPreferencesModel;
