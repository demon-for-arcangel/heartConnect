const { response, request } = require("express");
const Conexion = require("../../database/users/UserConnection");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../../helpers/jwt");
const nodemailer = require('nodemailer');

const conx = new Conexion();

const register = async (req, res) => {
  let body = req.body;
  let roles = req.body.roles; 
  console.log('cuerpo', body);
  try {
      let existingUser = await conx.getUserByEmail(body.email, body);
      if (existingUser) {
          return res.status(400).json({ msg: "El usuario ya existe" });
      }

      let hashedPassword = await bcrypt.hash(body.password, 10); 

      body.password = hashedPassword;
      body.active = false;

      let newUser = await conx.registerUser(body);
      console.log('usuario nuevo creado: ', newUser)

      if (roles && roles.length > 0) {
          await conx.assignRolesToUser(newUser.id, roles);
      }

      let token = await generarJWT(newUser.id, roles);

      res.status(201).json({ 
          firstName: body.firstName, 
          lastName: body.lastName, 
          email: body.email, 
          password: body.password, 
          photo_profile: body.photo_profile, 
          born_date: body.born_date, 
          domicile: body.domicile, 
          phone_number: body.phone_number, 
          token 
      });
  } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Error al registrar el usuario" });
  }
};

const login = async (req, res) => {
    let email = req.body.email;
    let storedHash = "";
    try{
    
      let searchUser = await conx.getUserByEmail(email);
      storedHash = searchUser.password;
      let isPasswordValid = await bcrypt.compare(req.body.password, storedHash);
      
      if (!isPasswordValid) {
        throw new Error("Contraseña incorrecta");
      }
      
      let roles = await conx.showRolUser(searchUser.id);
      
      let arrRoles = [];
      
      roles.forEach((element) => {
        if (element.id_rol != null) {
          arrRoles.push(element.id_rol);
        }
      });

      let token = await generarJWT(searchUser.id, arrRoles);
      res.status(200).json({ token });
    }catch(err){
      console.log(err)
      res.status(400).json({msg: "Credenciales invalidas"});
    }
  };

  

module.exports = {
  register,
  login,
}