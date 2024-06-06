const { response, request } = require("express");
const Conexion = require("../../database/preferences/PreferencesConnection");
const models = require('../../models');

const conx = new Conexion();

const index = async (req, res) => {
    const userId = req.params.userId;
    try {
        const userPreferences = await conx.indexPreferences(userId);
        
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

const getPreferencesById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const preference = await conx.getPreferenceById(userId);
        
        if (!preference) {
            return res.status(404).json({ msg: "Preferencia no encontrada para este usuario" });
        }

        const relationshipType = await models.PreferencesRelation.findByPk(preference.relationship_type);
        const interest = await models.PreferencesInterest.findByPk(preference.interest);
        
        const preferenceWithRelations = {
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

        res.status(200).json(preferenceWithRelations);
    } catch (error) {
        console.error('Error al obtener las preferencias del usuario por su Id', error);
        res.status(500).json({ msg: "Error" });
    }
}

const createPreference = async (req, res) => {
    const userId = req.params.userId;
    const preferencesData = req.body;
    try {
        const relationshipType = preferencesData.relationship_type;
        const interest = preferencesData.interest;
        
        const existingRelationshipType = await models.PreferencesRelation.findByPk(relationshipType);
        const existingInterest = await models.PreferencesInterest.findByPk(interest);

        if (!existingRelationshipType || !existingInterest) {
            return res.status(400).json({ msg: "Los IDs de relationship_type o interest proporcionados no son válidos" });
        }

        const newUserPreference = await conx.createPreference(userId, preferencesData);
        res.status(201).json(newUserPreference);
    } catch (error) {
        console.error('Error al crear la preferencia', error);
        res.status(500).json({ msg: "Error" });
    }
}

const updatePreference = async (req, res) => {
    const userId = req.params.userId;
    const preferenceId = req.params.preferenceId;
    const preferencesData = req.body;
    try {
        const relationshipType = preferencesData.relationship_type;
        const interest = preferencesData.interest;
        
        const existingRelationshipType = await models.PreferencesRelation.findByPk(relationshipType);
        const existingInterest = await models.PreferencesInterest.findByPk(interest);

        if (!existingRelationshipType || !existingInterest) {
            return res.status(400).json({ msg: "Los IDs de relationship_type o interest proporcionados no son válidos" });
        }

        const updatedUserPreference = await conx.updatePreference(userId, preferenceId, preferencesData);
        if (!updatedUserPreference) {
            return res.status(404).json({ msg: "Preferencia no encontrada para este usuario" });
        }
        res.status(200).json(updatedUserPreference);
    } catch (error) {
        console.error('Error al actualizar la preferencia', error);
        res.status(500).json({ msg: "Error" });
    }
}

const deletePreference = async (req, res) => {
    const userId = req.params.userId;
    const preferenceId = req.params.preferenceId;
    try {
        const deletedUserPreference = await conx.deletePreference(userId, preferenceId);
        if (!deletedUserPreference) {
            return res.status(404).json({ msg: "Preferencia no encontrada para este usuario" });
        }
        
        const deletedPreference = await models.Preferences.destroy({
            where: {
                id: preferenceId
            }
        });

        if (!deletedPreference) {
            return res.status(404).json({ msg: "Preferencia no encontrada en la tabla preferences" });
        }

        res.status(200).json({ msg: "Preferencia eliminada exitosamente" });
    } catch (error) {
        console.error('Error al eliminar la preferencia', error);
        res.status(500).json({ msg: "Error" });
    }
}

module.exports = {
    index, getPreferencesById, createPreference, updatePreference, deletePreference
};