require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");

class RecommendUserModel {
  constructor() {}

  async recommendUsers(userId) {
    try {
      const user = await models.User.findByPk(userId, {
        include: {
          model: models.Preferences,
          as: 'preferences'
        }
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (!user.preferences || user.preferences.length === 0) {
        throw new Error('Preferencias del usuario no encontradas');
      }

      const preferences = user.preferences[0];
      const { sports, artistic, politicians, relationship_type, has_children, wants_children, interest } = preferences;

      const recommendedUsers = await models.User.findAll({
        where: {
          id: { [Op.ne]: userId }
        },
        include: {
          model: models.Preferences,
          as: 'preferences',
          where: {
            sports: { [Op.gte]: Sequelize.literal(`${sports} / 2`) },
            artistic: { [Op.gte]: Sequelize.literal(`${artistic} / 2`) },
            politicians: { [Op.gte]: Sequelize.literal(`${politicians} / 2`) },
            relationship_type: relationship_type,
            has_children: has_children,
            wants_children: wants_children,
            interest: interest
          }
        }
      });

      return recommendedUsers;
    } catch (error) {
      console.error('Error al recomendar usuarios: ', error);
      throw error;
    }
  }
}

module.exports = RecommendUserModel;
