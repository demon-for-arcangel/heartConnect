require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

class UserFriendshipModel {
    showFriendship = async (id_user) => {
        try {
        const user = await models.User.findByPk(id_user);
        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        const friendships = await models.UserFriendShip.findAll({
            where: {
                id_user: id_user
            },
            include: [
            {
                model: models.User,
                as: 'friendship',
                attributes: ['id', 'firstName', 'lastName']
            }
            ]
        });

        const friends = friendships.map(friendship => friendship.friendship);

        return friends;
        } catch (error) {
        console.error('error al mostrar los amigos que tiene el usuario.');
        throw error;
        }
    }
}

module.exports = UserFriendshipModel;