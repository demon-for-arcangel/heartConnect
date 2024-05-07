const { response, request } = require("express");
const Conexion = require("../../database/users/UserConnection");
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

module.exports = {
    index, 
};