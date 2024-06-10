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

      const averagePreference = (sports + artistic + politicians) / 3;

      const recommendedUsers = await models.User.findAll({
        where: {
          id: { [Op.ne]: userId }
        },
        include: {
          model: models.Preferences,
          as: 'preferences',
          where: {
            [Op.and]: [
              Sequelize.where(
                Sequelize.fn('ABS', Sequelize.literal(`(sports + artistic + politicians) / 3 - ${averagePreference}`)),
                { [Op.lte]: 10 } 
              ),
              { relationship_type: relationship_type },
              { has_children: has_children },
              { wants_children: wants_children },
              { interest: interest }
            ]
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
