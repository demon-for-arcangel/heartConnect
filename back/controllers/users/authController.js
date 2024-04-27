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

      let token = await generarJWT(searchUser.id);
      res.status(200).json({ token });
    }catch(err){
      console.log(err)
      res.status(400).json({msg: "Credenciales invalidas"});
    }
};

const logout = async (req, res) => {
  try {
    // Eliminar el token del lado del cliente
    res.clearCookie('token');

    // Eliminar el token del lado del servidor
    const userId = req.user.email; // Suponiendo que tienes el ID del usuario en la solicitud
    const tokenDeleted = await conx.logout(userId);
    
    if (tokenDeleted) {
      res.status(200).json({ message: 'Logout exitoso' });
    } else {
      res.status(500).json({ message: 'Error al eliminar el token' });
    }
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ message: 'Error en logout' });
  }
};

module.exports = {
  register,
  login,
  logout
}