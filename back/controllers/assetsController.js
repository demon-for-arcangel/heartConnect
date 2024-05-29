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
    const asset = await assetsModel.getAssetById(req.params.id);

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
    const buffers = [];
    req.on('data', chunk => {
      buffers.push(chunk);
    });

    req.on('end', async () => {
      const buffer = Buffer.concat(buffers);
      const fileName = req.headers['file-name'];
      const userId = req.headers['user-id'];

      if (!fileName || !userId) {
        return res.status(400).json({ msg: "File name and user ID are required in headers" });
      }

      // Guardar en el sistema de archivos
      const filePath = path.join(__dirname, '../uploads/', fileName);
      fs.writeFileSync(filePath, buffer);

      // Guardar en la base de datos
      const asset = {
        path: filePath,
      };

      const savedAsset = await assetsModel.saveAsset(asset);

      // Asociar el asset al usuario
      await assetsModel.associateAssetWithUser(savedAsset.id, userId);

      res.status(201).json(savedAsset);
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error uploading file" });
  }
};

module.exports = {
  showAssetsUser,
  showAsset,
  uploadAsset
};