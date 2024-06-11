const { Sequelize, Op } = require("sequelize");
const models = require("../../models");

class RecommendUserModel {
  constructor() {}

  async recommendUsers(userId) {
    try {
      console.log(`Buscando usuario con ID: ${userId}`);
      const user = await models.User.findByPk(userId, {
        include: [{
          model: models.Preferences,
          as: 'preferences'
        }]
      });

      if (!user ||!user.preferences || user.preferences.length === 0) {
        console.error('Usuario no encontrado o preferencias del usuario no encontradas'); // Registro de error
        throw new Error('Usuario no encontrado o preferencias del usuario no encontradas');
      }

      const { avg_preferences, relationship_type, has_children, wants_children, interest } = user.preferences[0];

      const avg1 = Math.round(avg_preferences - 5);
      const avg2 = Math.round(avg_preferences + 5);    

      console.log(`Promedio: ${avg_preferences}, Rango Inferior: ${avg1}, Rango Superior: ${avg2}`);
      
      let recommendedUsers = await models.User.findAll({
        where: {
          id: { [Op.ne]: userId },
          '$preferences.avg_preferences$': {
            [Op.gte]: avg1, 
            [Op.lte]: avg2   
          },
          '$preferences.relationship_type$': relationship_type, 
          '$preferences.has_children$': has_children, 
          '$preferences.wants_children$': wants_children, 
        },
        include: [{
          model: models.Preferences,
          as: 'preferences',
        }],
      });

      // revisar porque no funciona correctamente
      if (interest === 'Mujeres') {
        recommendedUsers = recommendedUsers.filter(user => user.gender === 'Mujer');
      } else if (interest === 'Hombres') {
        recommendedUsers = recommendedUsers.filter(user => user.gender === 'Hombre');
      }

      console.log('Usuarios recomendados', recommendedUsers);

      return recommendedUsers;
    } catch (error) {
      console.error('Error al recomendar usuarios: ', error);
      throw error;
    }
  }
}

module.exports = RecommendUserModel;