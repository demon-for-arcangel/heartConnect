const { response, request } = require("express");
const Conexion = require("../../database/preferences/PreferencesConnection");
const models = require('../../models');

const conx = new Conexion();

const index = async (req, res) => {
    try {
        const preferences = await conx.indexPreferences();
        const preferencesWithRelations = await Promise.all(preferences.map(async (preference) => {
            const relationshipType = await models.PreferencesRelation.findByPk(preference.relationship_type);
            const interest = await models.PreferencesInterest.findByPk(preference.interest);
            const preferenceJSON = {
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
            return preferenceJSON;
        }));
        res.status(200).json(preferencesWithRelations);
    } catch (error) {
        console.error('Error al obtener las preferencias de los usuarios', error);
        res.status(500).json({ msg: "Error" });
    }
}

const getPreferencesById = async (req, res) => {
    const preferencesId = req.params.id;
    try {
        const preferences = await conx.getPreferenceById(preferencesId);
        if (!preferences) {
            return res.status(404).json({ msg: "Preferencias no encontradas" });
        }
        const relationshipType = await models.PreferencesRelation.findByPk(preferences.relationship_type);
        const interest = await models.PreferencesInterest.findByPk(preferences.interest);
        const preferenceJSON = {
            id: preferences.id,
            sports: preferences.sports,
            artistic: preferences.artistic,
            politicians: preferences.politicians,
            relationshipType: relationshipType ? relationshipType.type : null,
            hasChildren: preferences.has_children,
            wantsChildren: preferences.wants_children,
            interest: interest ? interest.gender : null,
            createdAt: preferences.createdAt,
            updatedAt: preferences.updatedAt
        };
        res.status(200).json(preferenceJSON);
    } catch (error) {
        console.error('Error al obtener las preferencias por su Id', error);
        res.status(500).json({ msg: "Error" });
    }
}

const createPreference = async (req, res) => {
    const preferencesData = req.body;
    try {
        const newPreference = await conx.createPreference(preferencesData);
        const relationshipType = await models.PreferencesRelation.findByPk(newPreference.relationship_type);
        const interest = await models.PreferencesInterest.findByPk(newPreference.interest);
        const preferenceJSON = {
            id: newPreference.id,
            sports: newPreference.sports,
            artistic: newPreference.artistic,
            politicians: newPreference.politicians,
            relationshipType: relationshipType ? relationshipType.type : null,
            hasChildren: newPreference.has_children,
            wantsChildren: newPreference.wants_children,
            interest: interest ? interest.gender : null,
            createdAt: newPreference.createdAt,
            updatedAt: newPreference.updatedAt
        };
        res.status(201).json(preferenceJSON);
    } catch (error) {
        console.error('Error al crear las preferencias', error);
        res.status(500).json({ msg: "Error" });
    }
}

const updatePreference = async (req, res) => {
    const preferenceId = req.params.id;
    const preferencesData = req.body;
    try {
        const updatedPreference = await conx.updatePreference(preferenceId, preferencesData);
        if (!updatedPreference) {
            return res.status(404).json({ msg: "Preferencias no encontradas" });
        }
        const relationshipType = await models.PreferencesRelation.findByPk(updatedPreference.relationship_type);
        const interest = await models.PreferencesInterest.findByPk(updatedPreference.interest);
        const preferenceJSON = {
            id: updatedPreference.id,
            sports: updatedPreference.sports,
            artistic: updatedPreference.artistic,
            politicians: updatedPreference.politicians,
            relationshipType: relationshipType ? relationshipType.type : null,
            hasChildren: updatedPreference.has_children,
            wantsChildren: updatedPreference.wants_children,
            interest: interest ? interest.gender : null,
            createdAt: updatedPreference.createdAt,
            updatedAt: updatedPreference.updatedAt
        };
        res.status(200).json(preferenceJSON);
    } catch (error) {
        console.error('Error al actualizar las preferencias', error);
        res.status(500).json({ msg: "Error" });
    }
}

const deletePreference = async (req, res) => {
    const preferenceId = req.params.id;
    try {
        const result = await conx.deletePreference(preferenceId);
        if (!result) {
            return res.status(404).json({ msg: "Preferencias no encontradas" });
        }
        res.status(200).json({ msg: "Preferencias eliminadas exitosamente" });
    } catch (error) {
        console.error('Error al eliminar las preferencias', error);
        res.status(500).json({ msg: "Error" });
    }
}



const getOptionsRelation = async (req, res) => {
    try {
        const relationOptions = await conx.getOptionsRelation();
        res.status(200).json(relationOptions);
    } catch (error) {
        console.error('Error al obtener las opciones de tipo de relación', error);
        res.status(500).json({ msg: "Error al obtener las opciones de tipo de relación" });
    }
}

const getOptionsInterest = async (req, res) => {
    try {
        const interestOptions = await conx.getOptionsInterest();
        res.status(200).json(interestOptions);
    } catch (error) {
        console.error('Error al obtener las opciones de interés', error);
        res.status(500).json({ msg: "Error al obtener las opciones de interés" });
    }
}

module.exports = {
    index, getPreferencesById, createPreference, updatePreference, deletePreference,
    getOptionsInterest, getOptionsRelation
};
