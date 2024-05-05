const { response, request } = require("express");
const Conexion = require("../../database/users/UserConnection");
const bcrypt = require("bcrypt");
const { generateRandPass } = require("../../helpers/generatePass");
const models = require('../../models');
const nodemailer = require('nodemailer');

/* const {sendMail} = require('../services/mailController')
 */
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
     const user = await models.User.findOne({
       where: { id: userId },
       include: [{
         model: models.Rol, 
         as: 'roles', 
         through: { attributes: [] },
       }]
     });
 
     if (!user) {
       return res.status(404).json({ msg: "User not found" });
     }
 
     const userWithRoles = {
       ...user.toJSON(), 
       roles: user.roles.map(role => role.toJSON()) 
     };
 
     res.status(200).json(userWithRoles);
  } catch (error) {
     console.error('Error al obtener usuario por ID', error);
     res.status(500).json({ msg: "Error" });
  }
 };

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

let transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
  }
});

const sendMail = async (mailOptions) =>{
  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          console.log('Error al enviar el correo electrónico:', error);
          res.status(203).json({'msg' : 'Correo NO enviado'})
      } else {
          console.log('Correo electrónico enviado exitosamente:', info.response);
          res.status(200).json({'msg' : 'Correo enviado'})
      }
  });
}

const registerUserByAdmin = async (req, res) => {
  let randPass = generateRandPass();
  req.body.password = await bcrypt.hash(randPass, 10);
  conx.registerUser(req.body)
  .then((msg) => {
    conx.createUserRols(msg.id, req.body.roles).then(async (rtnMsg) => {
      console.log(rtnMsg);
      let mailOptions = {
        from: process.env.MAIL_USER,
        to: msg.email,
        subject: "Bienvenido a HeartConnect",
        html: `<p>Hola ${msg.firstName},</p>
                <p>Gracias por registrarte en la plataforma.</p>
                <p>Tu usuario es: ${msg.email}</p>
                <p>Tu contraseña es: ${randPass}</p>
                <p>Para iniciar sesión, utiliza la siguiente dirección: <a href="${process.env.FRONT_URL}">${process.env.URL_LOGIN}</a></p>
                <p>Saludos cordiales</p>`,
      };
      sendMail(mailOptions);
    });
    console.log(msg);

    res.status(200).json(msg);
  })
  .catch((error) => {
    res.status(400).json(error);
  });
}

const updateUser = async (req, res) => {
  const userId = req.user.id;
  const newData = req.body;

  try {
    const updatedUser = await conx.updateUser(userId, newData);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ msg: "Error al actualizar el usuario" });
  }
}

const deleteUsers = async (req, res) => {
  const userIds = req.body.userIds;
 
  try {
     if (!Array.isArray(userIds) || userIds.length === 0) {
       return res.status(400).json({ msg: "No se proporcionaron IDs de usuario para eliminar." });
     }
 
     const result = await conx.deleteUsers(userIds);
     
     res.status(200).json(result);
  } catch (error) {
     console.error('Error al eliminar los usuarios:', error);
     res.status(500).json({ msg: "Error al eliminar los usuarios" });
  }
 }

const getActiveUsers = async (req, res) => {
  try {
    const activeUsers = await conx.getActiveUsers();
    res.status(200).json(activeUsers);
  } catch (error) {
    console.error('Error al obtener usuarios activos', error);
    res.status(500).json({ msg: "Error al obtener usuarios activos" });
  }
};

const getInactiveUsers = async (req, res) => {
  try {
    const inactiveUsers = await conx.getInactiveUsers();
    res.status(200).json(inactiveUsers);
  } catch (error) {
    console.error('Error al obtener usuarios inactivos', error);
    res.status(500).json({ msg: "Error al obtener usuarios inactivos" });
  }
};

module.exports = {
  index, getUserById, getUserByEmail, registerUserByAdmin, updateUser, deleteUsers,
  getActiveUsers, getInactiveUsers
};