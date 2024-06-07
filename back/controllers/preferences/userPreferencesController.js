const { response, request } = require("express");
const Conexion = require("../../database/preferences/UserPreferencesConnection");
const models = require('../../models');

const conx = new Conexion();

const index = async (req, res) => {
    const userId = req.params.userId;
    try {
        const userPreferences = await conx.indexUserPreferences(userId);
        
        const preferencesWithRelations = await Promise.all(userPreferences.map(async (preference) => {
            const relationshipType = await models.PreferencesRelation.findByPk(preference.relationship_type);
            const interest = await models.PreferencesInterest.findByPk(preference.interest);
            
            return {
                id: preference.id,
                sports: preference.sports,
                artistic: preference.artistic,
                politicians: preference.politicians,
                relationshipType: relationshipType ? relationshipType.type : null,
                hasChildren: preference.has_children,
                wantsChildren: preference.wants_children,
                interest: interest ? interest.gender : null,
                createdAt: preference.createdAt,
                updatedAt: preference.updatedAt
            };
        }));

        res.status(200).json(preferencesWithRelations);
    } catch (error) {
        console.error('Error al obtener las preferencias del usuario', error);
        res.status(500).json({ msg: "Error" });
    }
}

const getUserPreferencesById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const preference = await conx.getUserPreferenceById(userId);
        
        if (!preference) {
            return res.status(404).json({ msg: "Preferencia no encontrada para este usuario" });
        }

        res.status(200).json(preference);
    } catch (error) {
        console.error('Error al obtener las preferencias del usuario por su Id', error);
        res.status(500).json({ msg: "Error" });
    }
}

const createUserPreference = async (req, res) => {
    const userId = req.params.userId;
    const preferencesData = req.body;
    try {
        const { relationship_type, interest } = preferencesData;
        
        const existingRelationshipType = await models.PreferencesRelation.findByPk(relationship_type);
        const existingInterest = await models.PreferencesInterest.findByPk(interest);

        if (!existingRelationshipType || !existingInterest) {
            return res.status(400).json({ msg: "Los IDs de relationship_type o interest proporcionados no son válidos" });
        }

        const newPreference = await models.Preferences.create(preferencesData);

        const newUserPreference = await conx.createUserPreference(userId, { preferenceId: newPreference.id });
        
        res.status(201).json(newUserPreference);
    } catch (error) {
        console.error('Error al crear la preferencia', error);
        res.status(500).json({ msg: "Error" });
    }
}


const updateUserPreference = async (req, res) => {
    const userId = req.params.userId;
    const preferencesData = req.body;
    try {
        console.log(`Actualización de preferencias iniciada para el usuario ID: ${userId}`);

        const { relationship_type, interest } = preferencesData;

        const existingRelationshipType = await models.PreferencesRelation.findByPk(relationship_type);
        const existingInterest = await models.PreferencesInterest.findByPk(interest);

        if (!existingRelationshipType || !existingInterest) {
            return res.status(400).json({ msg: "Los IDs de relationship_type o interest proporcionados no son válidos" });
        }

        console.log(`Tipo de relación existente: ${JSON.stringify(existingRelationshipType)}`);
        console.log(`Interés existente: ${JSON.stringify(existingInterest)}`);
        console.log(userId)

        await conx.updateUserPreference(userId, preferencesData);

        res.status(200).json({ msg: "Preferencia actualizada exitosamente" });
    } catch (error) {
        console.error('Error al actualizar la preferencia', error);
        res.status(500).json({ msg: "Error" });
    }
}


const deleteUserPreference = async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const deletedPreference = await conx.deleteUserPreference(userId);
        
        if (!deletedPreference) {
            return res.status(404).json({ msg: "Preferencia no encontrada para este usuario" });
        }

        res.status(200).json({ msg: "Preferencia eliminada exitosamente" });
    } catch (error) {
        console.error('Error al eliminar la preferencia', error);
        res.status(500).json({ msg: "Error al eliminar la preferencia" });
    }
};

module.exports = {
    index, getUserPreferencesById, createUserPreference, updateUserPreference, deleteUserPreference
};