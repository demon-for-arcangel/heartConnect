const { response, request } = require("express");
const Conexion = require("../../database/users/UserFriendshipConnection");

const conx = new Conexion();

const showFriendship = async (req, res) => {
    const id_user = req.params.id; 

    try {
        const friends = await conx.showFriendship(id_user);
        res.status(200).json(friends);
    } catch (error) {
        console.error('Error al mostrar las amistades del usuario:', error);
        res.status(500).json({ msg: "Error al mostrar las amistades del usuario" });
    }
};

module.exports = {
    showFriendship
};