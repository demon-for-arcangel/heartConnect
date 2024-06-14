const { response, request } = require("express");
const Conexion = require("../../database/users/RecommendationUserConnection");
const models = require('../../models');

const conx = new Conexion();

const recommendUsers = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const recommendedUsers = await conx.recommendUsers(userId);
  
      res.status(200).json(recommendedUsers);
    } catch (error) {
      console.error('Error al recomendar usuarios:', error);
      res.status(500).json({ msg: "Error al recomendar usuarios" });
    }
  };

module.exports = {
  recommendUsers
};