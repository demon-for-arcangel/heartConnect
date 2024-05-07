const { response, request } = require("express");
const Conexion = require("../../database/preferences/PreferencesConnection");
const bcrypt = require("bcrypt");
const { generateRandPass } = require("../../helpers/generatePass");
const models = require('../../models');
const nodemailer = require('nodemailer');

const conx = new Conexion();

const index = async (req, res) => {
    try {
        const preferences = await conx.indexPreferences();
        res.status(200).json(preferences);
    } catch (error) {
        console.error('Error al obtener las preferencias de los usuarios', error);
        res.status(500).json({ msg: "Error" });
    }
}

const getPreferencesById = async (req, res) => {
    const preferencesId = req.params.id;
    try {
        const preferences = await models.Preferences.findOne({
            where: { id: preferencesId },
        });

        if (!preferences) {
            return res.status(404).json({ msg: "Preferencias no encontradas" });
        }
        res.status(200).json(preferences);
    } catch (error) {
        console.error('Error al obtener las preferencias por su Id', error);
        res.status(500).json({ msg: "Error" });
    }
}

module.exports = {
    index, getPreferencesById
};