const { response } = require("express");
const fs = require('fs');
const path = require('path');
const AssetsModel = require("../database/assetsConnection");
const assetsModel = new AssetsModel();

const showAssetsUser = async (req, res = response) => {
  try {
    const assets = await assetsModel.getAssetsOfUser(req.params.id);
    res.status(200).json(assets);
  } catch (err) {
    console.error(err);
    res.status(404).json({ msg: "User has no assets" });
  }
};

const showAsset = async (req, res = response) => {
  try {
    const assetId = parseInt(req.params.id);

    if (isNaN(assetId)) {
      throw new Error('Invalid asset id');
    }

    const asset = await assetsModel.getAssetById(assetId);
    console.log(asset)
    if (asset) {
      const filePath = path.join(__dirname, '../uploads/photo_profile/', path.basename(asset.path));
      console.log('Archivo encontrado:', filePath);
      res.status(200).json({ filePath });
    } else {
      console.log("Asset no encontrado");
      res.status(404).json({ msg: "Asset not found" });
    }

  } catch (err) {
    console.error(err);
    res.status(404).json({ msg: "Asset not found" });
  }
};

const uploadAsset = async (req, res = response) => {
  try {
    console.log("Inicio de la carga de archivos");

    const contentType = req.headers['content-type'];
    const userId = req.headers['user-id'];

    console.log("Headers recibidos:", { contentType, userId });

    if (!userId) {
      console.log("Falta userId en los headers");
      return res.status(400).json({ msg: "User ID is required in headers" });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No se encontró ningún archivo en la solicitud");
      return res.status(400).json({ msg: "No file was uploaded" });
    }

    console.log("Archivos recibidos:", req.files);

    let files = req.files.file;

    // Asegurarse de que files sea un array
    if (!Array.isArray(files)) {
      files = [files];
    }

    const savedAssets = [];

    for (const file of files) {
      const fileName = generateUniqueFileNameWithExtension(file.name);
      const filePath = path.join(__dirname, '../uploads/', fileName).replace(/\\/g, '/');

      await new Promise((resolve, reject) => {
        file.mv(filePath, async (err) => {
          if (err) {
            console.error("Error al mover el archivo:", err);
            return reject(err);
          }

          console.log("Archivo guardado en el sistema de archivos:", filePath);

          const asset = { path: filePath };
          const savedAsset = await assetsModel.saveAsset(asset);
          console.log("Asset guardado en la base de datos:", savedAsset);

          await assetsModel.associateAssetWithUser(savedAsset.id, userId);
          console.log("Asset asociado al usuario");

          savedAssets.push(savedAsset);
          resolve();
        });
      });
    }

    res.status(201).json(savedAssets);

  } catch (err) {
    console.error("Error durante la carga del archivo:", err);
    res.status(500).json({ msg: "Error al subir el archivo" });
  }
};


function generateUniqueFileNameWithExtension(originalFileName) {
  if (!originalFileName) {
    throw new TypeError('The original file name is required');
  }

  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileExtension = path.extname(originalFileName);

  if (!fileExtension) {
    throw new TypeError('The file extension is required');
  }

  return `${timestamp}-${randomString}${fileExtension}`;
}

module.exports = {
  showAssetsUser,
  showAsset,
  uploadAsset
};
