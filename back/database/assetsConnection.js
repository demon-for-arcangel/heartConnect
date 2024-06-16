require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../models/index.js");
const Conexion = require("./connection.js");

const conexion = new Conexion();

class AssetsModel {
  constructor() {}

  getAssetById = async (assetId) => {
    let resultado = []; 
    try {
        conexion.conectar();
        resultado = await models.Asset.findOne({
            attributes: ["path"],
            where: {
                id: assetId,
            },
        });
        conexion.desconectar();
        if (!resultado) {
            throw new Error("Asset not found");
        }
    } catch (error) {
        throw error;
    } finally {
        return resultado;
    }
};


  saveAsset = async (asset) =>{
    let resultado = [];
    try{
        conexion.conectar();
        resultado = await models.Asset.create(asset);
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

  deleteAssetById = async (assetId) => {
    try {
      const asset = await this.getAssetById(assetId);
      if (!asset) {
        throw new Error("Asset no encontrado");
      }
  
      await this.deleteAsset(assetId); 
  
      await models.UserAssets.destroy({
        where: {
          id_asset: assetId,
        },
      }); 
  
      return true; 
    } catch (error) {
      throw error;
    }
  };

  getAssetsByArrIds = async (arrId) => {
    let resultado = [];
    let rtnAssets = [];
    try {
      conexion.conectar();
      for (let i =  0; i < arrId.length; i++) {
        resultado = await models.Asset.findOne({
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

  deleteAssetById = async (assetId) => {
    try {
      const asset = await this.getAssetById(assetId);
      if (!asset) {
        throw new Error("Asset no encontrado");
      }
  
      await models.UserAssets.destroy({
        where: {
          id_asset: assetId
        }
      });
  
      const deletedRows = await models.Asset.destroy({
        where: {
          id: assetId
        }
      });
  
      if (deletedRows === 0) {
        throw new Error("no se puede eliminar el asset");
      }
  
      return true;
    } catch (error) {
      throw error;
    }
  };

  async addAsset (filePath) {
    try {
      const asset = await models.Asset.create({ path: filePath });
      return asset.id;
    } catch (error) {
      console.error('Error adding asset:', error);
      throw error;
    }
  };

  async updateUserProfilePhoto (userId, assetId) {
    try {
      await models.User.update(
        { photo_profile: assetId },
        { where: { id: userId } }
      );
      console.log('User profile photo updated successfully.');
    } catch (error) {
      console.error('Error updating user profile photo:', error);
      throw error;
    }
  };

  //-------------------------User_Assets---------------------------
  async associateAssetWithUser(assetId, userId) {
    try {
        await models.UserAssets.create({
            id_user: userId,
            id_asset: assetId
        });
    } catch (error) {
        throw error;
    }
  }

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
                  model: models.Asset,
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