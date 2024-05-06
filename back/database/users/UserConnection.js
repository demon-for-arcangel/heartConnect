require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

class UserModel {
  constructor() {}
    
  async indexUsers() {
    try {
      const users = await models.User.findAll();
      return users;
    }catch (error){
      console.error('Error al mostrar la lista de usuarios: ', error);
      console.error('Error al mostrar la lista de usuarios: ', error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await models.User.findByPk(id);
      if (!user) {
        throw new Error('User no encontrado');
        throw new Error('User no encontrado');
      }
      return user;
    } catch (error){
      console.error('Error al mostrar el usuario: ', error);
      console.error('Error al mostrar el usuario: ', error);
      throw error;
    }
  }

  async getUserByEmail(email, userData) {
    try {
       let user = await models.User.findOne({
         where: {
           email: email
         }
       });
       
       return user;
    } catch (error) {
       console.error('Error al obtener o crear usuario por email:', error);
       throw error;
    }
}


  async registerUser(userData) {
    try {
        console.log('datos del nuevo: ', userData);
        if (!userData || typeof userData !== 'object') {
            throw new Error('Datos de usuario inválidos');
        }

        const newUser = await models.User.create(userData);

        if (!newUser) {
            throw new Error('No se pudo crear el usuario');
        }

        return newUser;
    } catch (error) {
        console.error('Error al registrar un nuevo usuario:', error);
        throw error;
    }
  }

  createUserRols = async (userId, arrRolesName) => {
    let newRoles = [];
    try {
       conexion.conectar();
       for (let roleName of arrRolesName) {
         const role = await models.Rol.findOne({
           where: {
             name: roleName
           }
         });
         if (!role) {
           console.error(`El rol con nombre ${roleName} no se encontró.`);
         }
         let newRole = await models.UserRols.create({
           id_user: userId,
           id_rol: role.id, 
           id_rol: role.id, 
         });
         newRoles.push(newRole);
       }
    } catch (error) {
       console.error('Error al crear roles de usuario:', error);
       throw error;
    } finally {
       conexion.desconectar();
    }
    return newRoles;
   };

  updateUser = async (userId, newData) => {
    try {
      const user = await models.User.findByPk(userId);
      if (!user) {
        throw new Error('User nor found.');
      }

      const updated = await user.update(newData);
      return updated;
    }catch (error) {
      console.error('Error al actualizar el usuario: ', error);
      throw error;
    }
  }

  deleteUsers = async (userIds) => {
    try {
       if (!Array.isArray(userIds) || userIds.length === 0) {
         throw new Error('No se proporcionaron IDs de usuario para eliminar.');
       }
   
       const result = await models.User.destroy({
         where: {
           id: userIds
         }
       });
   
       return { message: `${result} usuarios eliminados.` };
    } catch (error) {
       console.error('Error al eliminar los usuarios:', error);
       throw error;
    }
  }

  getActiveUsers = async () => {
    try {
      const activeUsers = await models.User.findAll({
        where: {
          active: 1
        }
      }); 
      return activeUsers;
    } catch (error) {
      console.error('Error al mostrar los usuarios activos: ', error);
      console.error('Error al mostrar los usuarios activos: ', error);
      throw error;
    }
  }

  getInactiveUsers = async () => {
    try {
      const inactiveUsers = await models.User.findAll({
        where: {
          active: 0
        }
      }); 
      return inactiveUsers;
    } catch (error) {
      console.error('Error al mostrar los usuarios inactivos: ', error);
      throw error;
    }
  }

  activateUsers = async (userIds) => {
    try {
      if (!Array.isArray(userIds) || userIds.length === 0) {
         throw new Error('No se proporcionaron IDs de los usuarios.');
      }
   
      const updatedUsers = await models.User.update(
         { active: 1 },
         { where: { id: userIds } } 
      );
   
      return { message: `${updatedUsers} usuarios activados.` };
    } catch (error) {
      console.error('Error al activar los usuarios: ', error);
      throw error;
    }
  }

  desactivateUsers = async (userIds) => {
    try {
      if (!Array.isArray(userIds) || userIds.length === 0) {
        throw new Error('No se proporcionaron IDs de los usuarios.');
      }

      const updatedUsers = await models.User.update(
        { active: 0 },
        { where: { id: userIds } } 
      );
  
      return { message: `${updatedUsers} usuarios desactivados.` };
    } catch (error) {
      console.error('Error al desactivar los usuarios: ', error);
      throw error;
    }
  }
}

module.exports = UserModel;