const { response, request } = require("express");
const Conexion = require("../../database/users/UserConnection");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../../helpers/jwt");

const conx = new Conexion();

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
    login
}