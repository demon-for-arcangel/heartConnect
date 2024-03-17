const { response, request } = require("express");
const Conexion = require("../../database/users/UserConnection");
const bcrypt = require("bcrypt");
const { generateRandPass } = require("../../helpers/generatePass");
const { sendMail } = require("../services/mailController");

const conx = new Conexion();

/**
 *
 * Esta función es compartida por dos rutas,
 * se intenta obtener el id del usuario de la petición por el params,
 * si no se encuentra, se intenta obtener el id del usuario de la petición por el body,
 * el try catch hace su magia.
 *  */
const showUser = (req, res = response) => {
  let id = 0;
  try {
    id = req.params.id;
  } catch (err) {
    console.log(err);
  } finally {
    if (!id) {
      id = req.userId;
    }
  }

  conx
    .showUser(id)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((err) => {
      res.status(404).json({ msg: "User not found" });
    });
};

const getUserByValue = (req, res = response) => {
  let value = req.body.email;
  if (value == null) {
    value = req.body.id;
  }
  conx
    .searchByValue(value)
    .then((msg) => {
      if (msg.length == 0) {
        res.status(404).json({ msg: "User not found" });
      } else {
        res.status(200).json(msg);
      }
    })
    .catch((err) => {
      res.status(404).json({ msg: "User not found" });
    });
};


const newUser = async (req, res) => {
  let randPass = generateRandPass();
  req.body.password = await bcrypt.hash(randPass, 10);

  conx
    .registrarUsuario(req.body)
    .then((msg) => {
      conx.createUserRols(msg.id, req.body.roles).then(async (rtnMsg) => {
        console.log(rtnMsg);
        let mailOptions = {
          from: process.env.MAIL_USER,
          to: msg.email,
          subject: "Bienvenido al Club de natación",
          html: `<p>Hola ${msg.firstName},</p>
                  <p>Gracias por registrarte en la plataforma de tutorías.</p>
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
};

const updateUser = async (req, res) => {
  let pass = req.body.password;

  if (pass != null) {
    req.body.password = await bcrypt.hash(pass, 10);
  }

  if (req.body.roles != null) {
    await conx
      .updateRolsUser(req.body.id, req.body.roles)
      .then((msg) => {
        let check = false;
        let i = 0;
        while (req.body.roles.length > i && !check) {
          if (req.body.roles[i] == process.env.ID_ROL_TUTOR) {
            check = true;
          }
          i++;
        }
        if (!check) {
          conx
            .removeSociosUser(req.body.id)
            .then((rtnMsg) => {
              console.log(rtnMsg);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        // res.status(200).json(error)
      });
  }

  conx
    .updateUser(req.body.id, req.body)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const forgetPass = async (req, res) => {
  let email = req.body.email;
  let pass = generateRandPass();
  let newPassword = { password: await bcrypt.hash(pass, 10) };
  conx
    .getUserByEmail(email)
    .then((idUser) => {
      console.log(idUser.id);
      conx
        .updateUser(idUser.id, newPassword)
        .then(async (msg) => {
          console.log("llego");
          let mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Recuperación de contraseña',
            text: `Su contraseña ha sido actualizada, su nueva contraseña es: ${pass}`,
          };
          await sendMail(mailOptions);
          res.status(200).json({ msg: "new password: " + pass });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ msg: "Usuario no encontrado" });
    });
};

const index = async (req, res) => {
  conx
    .indexUsers()
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const deleteUser = async (req, res) => {
  conx
    .deleteUser(req.params.id)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

//---------------------_Gestion_Socios_----------------------------

const showSocios = async (req, res) => {
  conx
    .showSocios()
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json({ msg: "No se han encontrado socios", error: error });
    });
};

const showSociosOfTutor = async (req, res) => {
  conx
    .showSociosOfTutor(req.params.idTutor)
    .then((msg) => {
      let arrSocios = [];
      msg.forEach((element) => {
        let rtnSocio = {
          id: element.socio.id,
          firstName: element.socio.firstName,
          lastName: element.socio.lastName,
          email: element.socio.email,
          photo_profile: element.socio.image.ruta,
        };
        arrSocios.push(rtnSocio);
      });

      res.status(200).json(arrSocios);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const showTutorsOfSocio = async (req, res) => {
  conx
    .showTutorsOfSocio(req.params.idSocio)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const asignUser = async (req, res) => {
  let arrSocios = [];

  const tutorId = req.body.id_tutor;
  const socioId = req.body.id_socio;

  await conx.removeSociosUser(tutorId).then((msg) => {
    console.log(msg);
  });

  if (Array.isArray(socioId)) {
    for (const socio of socioId) {
      await setUserToTutor(tutorId, socio.id, arrSocios);
    }
  } else {
    await setUserToTutor(tutorId, socioId.id, arrSocios);
  }

  if (arrSocios.length == socioId.length) {
    res.status(201).json({ msg: "Socios actualizados", socios: arrSocios });
  } else {
    res.status(401).json({ msg: "El usuario ya está asociado o no existe" });
  }
};

const setUserToTutor = async (tutorId, socioId, arrSocios) => {
  await conx
    .asignUser(tutorId, socioId)
    .then((msg) => {
      arrSocios.push(msg);
      console.log(msg.dataValues);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

//---------------------------------------------------------

/**
 * Esta función debería ir al controlador de rolController,
 * pero como no vamos a tener lo que es un CRUD de roles,
 * y los roles que hay son los que se quedan, no voy a hacer
 * un controlador para una sola función, es por eso que meto aquí
 * la función de mostrar roles en usuarios.
 */
const showRols = async (req, res) => {
  conx
    .showRols()
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      res.status(400).json({ msg: "Roles no encontrados", error: error });
    });
};

module.exports = {
  newUser,
  showUser,
  index,
  forgetPass,
  updateUser,
  getUserByValue,
  deleteUser,
  showSociosOfTutor,
  showTutorsOfSocio,
  asignUser,
  showSocios,
  showRols,
};