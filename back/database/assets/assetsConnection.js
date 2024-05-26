require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../models/index.js");
const Conexion = require("./connection.js");

const conexion = new Conexion();

/**
 * @author: badr
 */

class AssetsModel {
  constructor() {}

  getAssetById=async(assetId)=>{
    let resultado = [];
    try{
        conexion.conectar();
        resultado = await models.Assets.findOne({
            attributes:["path"],
            where: {
                id: assetId,
            },
        });
        conexion.desconectar();
        if (!resultado) {
            throw new Error("Asset not found");
          }
    }catch(error){
        throw error
    }finally{
        return resultado;
    }

  }

  saveAsset = async (asset) =>{
    let resultado = [];
    try{
        conexion.conectar();
        resultado = await models.Assets.create(asset);
        conexion.desconectar();
      }catch(error){
        throw error
      }finally{
      if (!resultado) {
          throw new Error("user not found");
        }
        return resultado;
    }
  }

  deleteByRuta =async(assetId)=>{
    let resultado = [];
    console.log(assetId)
    try{
        conexion.conectar();
        resultado = await models.Assets.destroy({
          where: {
            path: assetId
          },
        });
        conexion.desconectar();
        if (!resultado) {
            throw new Error("Asset not found");
          }
    }catch(error){
        throw error
    }finally{
        return resultado;
    }

  }

  getAssetsByArrIds = async (arrId) => {
    let resultado = [];
    let rtnAssets = [];
    try {
      conexion.conectar();
      for (let i =  0; i < arrId.length; i++) {
        resultado = await models.Assets.findOne({
          attributes: ["path"],
          where: {
            id: arrId[i],
          },
        });
        if (resultado) {
          rtnAssets.push(resultado);
        } else {
          throw new Error("Asset not found");
        }
      }
      conexion.desconectar();
    } catch (error) {
      throw error;
    } finally {
      return rtnAssets;
    }
  };
  

  //-------------------------User_Assets---------------------------

  getAssetsOfUser = async (userId) => {
    let resultado = [];
    try{

        conexion.conectar();
        resultado = await models.UserAssets.findAll({
            attributes:['id_user'],
            where: {
                id_user: userId,
            },
            include: [
                {
                  model: models.Assets,
                  attributes: ["id", "path"],
                },
              ]
            
        });
        conexion.desconectar();
        if (!resultado) {
            throw new Error("user not found");
          }
    }catch(error){
        throw error
    }finally{
        return resultado;
    }

  };

  saveAssetOfUser = async (userId, assetId) =>{
    let resultado = [];
    try{

        conexion.conectar();
        resultado = await models.UserAssets.create(
            {
                id_user: userId,
                id_asset: assetId,
            }
            );
        conexion.desconectar();
        if (!resultado) {
            throw new Error("user not found");
          }
    }catch(error){
        throw error
    }finally{
        return resultado;
    }
  }
}

module.exports = AssetsModel;