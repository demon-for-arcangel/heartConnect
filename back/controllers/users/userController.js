const { response, request } = require("express");
const Conexion = require("../../database/users/UserConnection");
const bcrypt = require("bcrypt");
const { generateRandPass } = require("../../helpers/generatePass");

const conx = new Conexion();

const index = async (req, res) => {
  try{
    const users = await conx.indexUsers();
    res.status(200).json(users);
  }catch (error){
    console.error('Error al obtener usuarios', error);
    res.status(500).json({ msg: "Error"});
  }
}

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await conx.getUserById(userId); 
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener usuario por ID', error);
    res.status(500).json({ msg: "Error"});
  }
}

const getUserByEmail = async (req, res) => {
  const email = req.body.email;
  console.log('Correo electrónico recibido:', email);
  try {
    const user = await conx.getUserByEmail(email); 
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener usuario por email', error);
    res.status(500).json({ msg: "Error"});
  }
}

module.exports = {
  index, getUserById, getUserByEmail
};