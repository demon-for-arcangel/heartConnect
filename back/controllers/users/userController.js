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
  try {
    const user = await conx.getUserByEmail(email); 
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener usuario por email', error);
    res.status(500).json({ msg: "Error"});
  }
}

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, born_date, domicile, phone_number, roles, active } = req.body;

  try {
    const existingUser = await conx.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await conx.registerUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      photo_profile: 1,
      born_date,
      domicile,
      phone_number,
      roles,
      active
    });
    res.status(201).json(firstName, lastName, email, password, photo_profile, born_date, domicile, phone_number, roles, active);
  } catch (error) {
    console.error('Error al registrar un nuevo usuario: ', error);
    res.status(500).json({ msg: "Error al registrar el usuario" });
  }
}

module.exports = {
  index, getUserById, getUserByEmail, registerUser
};