const { response, request } = require("express");
const Conexion = require("../../database/rols/RolConnection");
const models = require('../../models');

const conx = new Conexion();

const index = async (req, res) => {
    try{
        const rols = await conx.indexRols();
        res.status(200).json(rols);
    }catch (error){
        console.error('Error al obtener los roles', error);
        res.status(500).json({ msg: "Error"});
    }
}

const getRolById = async (req, res) => {
    const rolId = req.params.id;
    try {
        const rol = await conx.getRolById(rolId);

        if (!rol) {
            return res.status(404).json({ msg: "Rol no encontrado" });
        }

        res.status(200).json(rol);
    } catch (error) {
        console.error('Erro al obtener el rol por su ID', error);
        res.status(500).json({ msg: "Error" });
    }
}

const updateRol = async (req, res) => {
    const rolId = req.params.id;
    const newData = req.body;

    try {
        const updateRol = await conx.updateRol(rolId, newData);
        res.status(200).json(updateRol);
    } catch (error) {
        console.error('Error al actualizar el rol: ', error);
        res.status(500).json({ msg: "Error al actualizar" });
    }
}

module.exports = {
    index, getRolById, updateRol
};