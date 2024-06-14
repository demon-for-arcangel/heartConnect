const { faker } = require('@faker-js/faker');
const Conexion = require("../database/users/UserConnection");
const rol = require("../database/rols/RolConnection");

const userRolFactory = async (num_gen) => {
    const conx = new Conexion();
    const conxRol = new rol();

    let arrUserRols = [];
    const users = await conx.indexUsers();
    const rols = await conxRol.indexRols();

    const assignedUsers = new Set();

    for (let i = 0; i < num_gen; i++) {
        let randUserNum = Math.floor(Math.random() * users.length);
        let randRolNum = Math.floor(Math.random() * rols.length);

        let userId = users[randUserNum].id;
        let rolId = rols[randRolNum].id;

        if (userId && rolId && !assignedUsers.has(userId)) {
            const fakeUserRol = {
                id_user: userId,
                id_rol: rolId,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            arrUserRols.push(fakeUserRol);
            assignedUsers.add(userId);
        }
    }
    return Promise.all(arrUserRols);
}

module.exports = { 
    userRolFactory
};
