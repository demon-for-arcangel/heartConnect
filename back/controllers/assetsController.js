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
      const filePath = `../../../../assets/uploads/photo_profile/${path.basename(asset.path)}`;
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

    const buffers = [];
    req.on('data', chunk => {
      console.log("Recibiendo datos...");
      buffers.push(chunk);
    });

    req.on('end', async () => {
      console.log("Terminó de recibir datos");

      const buffer = Buffer.concat(buffers);
      const contentType = req.headers['content-type'];
      const contentDisposition = req.headers['content-disposition'];
      const userId = req.headers['user-id'];

      console.log("Headers recibidos:", { contentType, contentDisposition, userId });

      if (!userId || !contentDisposition) {
        console.log("Falta userId o contentDisposition en los headers");
        return res.status(400).json({ msg: "File data and user ID are required in headers" });
      }

      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (!fileNameMatch) {
        console.log("Nombre del archivo no encontrado en contentDisposition");
        return res.status(400).json({ msg: "File name is required" });
      }
      const fileName = fileNameMatch[1];

      console.log("Nombre del archivo:", fileName);

      // Guardar en el sistema de archivos
      const filePath = path.join(__dirname, '../uploads/', fileName);
      fs.writeFileSync(filePath, buffer);

      console.log("Archivo guardado en el sistema de archivos:", filePath);

      // Guardar en la base de datos
      const asset = {
        path: filePath,
      };

      const savedAsset = await assetsModel.saveAsset(asset);

      console.log("Asset guardado en la base de datos:", savedAsset);

      // Asociar el asset al usuario
      await assetsModel.saveAssetOfUser(userId, savedAsset.id);

      console.log("Asset asociado al usuario");

      res.status(201).json(savedAsset);
    });

  } catch (err) {
    console.error("Error durante la carga del archivo:", err);
    res.status(500).json({ msg: "Error al subir el archivo" });
  }
};

module.exports = {
  showAssetsUser,
  showAsset,
  uploadAsset
};