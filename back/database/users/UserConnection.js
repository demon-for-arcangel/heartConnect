require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

class UserModel {
    constructor() {}

    getUserByEmail = async (email) => {
      let result = [];
      conexion.conectar();
      result = await models.User.findOne({
          where: {
              email: email,
          },
          attributes: ["id", "firstName", "lastName", "email", "phone_number", "password", "domicile", "born_date", "active"],
      });
      conexion.desconectar();
      return result || null;
    }

    getUserById = async (id) => {
        let result = [];
        conexion.conectar();
        result = await models.User.findByPk(id, {
            attributes: ["id", "firstName", "lastName", "email", "phone_number", "password", "domicile", "born_date", "active"],
        });
        conexion.desconectar();
        if (!result){
            throw new Error("User not found by id");
        }
        return result;
    }

    searchByValue = async (value) => {
        let result = [];
        conexion.conectar();
        result = await models.Users.findAll({
          where: {
            [Op.or]: {
              email: { [Op.like]: `%${value}%` },
              id: { [Op.like]: `%${value}%` },
            },
          },
          attributes: ["id", "firstName", "lastName", "email"],
        });
        conexion.desconectar();
        if (!result) {
          throw new Error("User not found");
        }
        return result;
    };

    showUser = async (id) => {
      conexion.conectar();
      let result = await models.Users.findByPk(id, {
        attributes: ["id", "firstName", "lastName", "email"],
          include: [
            {
            model: models.Rol,
            as: "roles",
            attributes: ["id", "name"],
            through: {
              attributes: [],
            }
          },
            {
              model: models.Assets,
              as: "image",
              attributes: ["ruta"]
            },
        ]
        });
    
        console.log(result);
        if (!result) {
          conexion.desconectar();
          throw new Error("User not found");
         }
        conexion.desconectar();
        return result;
    };

    showRolUser = async (id) => {
        conexion.conectar();
        let result = await models.UserRols.findAll({
          where: { id_user: id },
        });
    
        if (!result) {
          conexion.desconectar();
          throw error;
        }
        conexion.desconectar();
        return result;
    };

    deleteUser = async (id) => {
        conexion.conectar();
        let result = await models.Users.findByPk(id);
        await result.destroy();
    
        if (!result) {
          conexion.desconectar();
          throw error;
        }
        conexion.desconectar();
        return result;
    };

    registrarUsuario = async (user) => {
      console.log(user)
      let newUser = 0;
      conexion.conectar();
      try {
        newUser = await models.User.create(user);
      } catch (error) {
        throw error;
      } finally {
        conexion.desconectar();
      }
      return newUser;
  };

    updateUser = async (id, user) => {
        let upUser = 0;
        conexion.conectar();
        try {
          upUser = await models.Users.findByPk(id);
          await upUser.update(user);
          await upUser.save();
        } catch (error) {
          throw error;
        } finally {
          conexion.desconectar();
        }
        return upUser;
    };

    createUserRols = async (userId, arrRolsId) => {
        let newRoles = [];
        try {
          conexion.conectar();
          for (let rol of arrRolsId) {
            let newRole = await models.UserRol.create({
              id_user: userId,
              id_rol: rol.id,
            });
            newRoles.push(newRole);
          }
        } catch (error) {
          throw error;
        } finally {
          conexion.desconectar();
        }
        return newRoles;
    };

    updateRolsUser = async (userId, arrRolsId) => {
        let upUsers = [];
        let updatedRoles = [];
        try {
          conexion.conectar();
          /**
           * Primero buscamos al usuario, para luego quitarle todos los roles.
           * Y finalmente actualizarlos por los nuevos, insertandolos desde el array
           * que nos viene como rolId
           */
          upUsers = await models.UserRol.findAll({ where: { id_user: userId } });
    
          if (upUsers.length >= 1) {
            for (let userRole of upUsers) {
              await userRole.destroy();
            }
          }
    
          for (let rol of arrRolsId) {
            let newRole = await models.UserRol.create({
              id_user: userId,
              id_rol: rol.id,
            });
            updatedRoles.push(newRole);
          }
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          conexion.desconectar();
        }
        return updatedRoles;
    };

    indexUsers = async () => {
        let listUsers = 0;
        conexion.conectar();
    
        try {
          listUsers = await models.Users.findAll({
            attributes: ["id","firstName","lastName", "email"],
            include: [
              {
              model: models.Rol,
              as: "roles",
              attributes: ["id"],
              through: {
                attributes: [],
              },
            },{
              model: models.Assets,
              as: "image",
              attributes: ["ruta"] 
          }],
          });
        } catch (error) {
          throw error;
        } finally {
          conexion.desconectar();
        }
        return listUsers;
    };

    showRols = async () => { 
        let result = [];
        try{
          conexion.conectar();
          result = await models.Rol.findAll({
            attributes: ["id", "name"],
          });
        }catch(err){
          throw err;
        }finally{
          conexion.desconectar();
          if (!result) {
            throw new Error("Roles not found");
          }
          return result;
        }
    }
}

module.exports = UserModel;