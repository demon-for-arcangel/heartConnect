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
                <p>Para iniciar sesión, utiliza la siguiente dirección: <a href="${process.env.URL_LOGIN}">${process.env.URL_LOGIN}</a></p>
                <p>Saludos cordiales</p>`,
      };
      await sendMail(mailOptions);
    });
    console.log(msg);

    res.status(200).json(msg);
  })
  .catch((error) => {
    res.status(400).json(error);
  });
}

module.exports = {
  index, getUserById, getUserByEmail, registerUserByAdmin
};