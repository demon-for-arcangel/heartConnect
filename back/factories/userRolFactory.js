const { faker } = require('@faker-js/faker');
const Conexion = require("../database/users/UserConnection");

const userRolFactory = async (num_gen) => {
    const conx = new Conexion();
}

module.exports = { 
    userRolFactory
};