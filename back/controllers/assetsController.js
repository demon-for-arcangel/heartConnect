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
    res.status(404).json({ msg: "Usuario no tiene assets" });
  }
};

const showAsset = async (req, res = response) => {
  try {
    const assetId = parseInt(req.params.id);

    if (isNaN(assetId)) {
      throw new Error('Id de asset no válido');
    }

    const asset = await assetsModel.getAssetById(assetId);
    console.log(asset)
    if (asset) {
      const relativePath = path.relative(__dirname, path.join(__dirname, '../../../../assets/uploads/photo_profile/', path.basename(asset.path)));
      const normalizedPath = relativePath.replace(/\\/g, '/');
      console.log('Archivo encontrado:', normalizedPath);
      res.status(200).json({ filePath: normalizedPath });
    } else {
      console.log("Asset no encontrado");
      res.status(404).json({ msg: "Asset no encontrado" });
    }

  } catch (err) {
    console.error(err);
    res.status(404).json({ msg: "Asset no encontrado" });
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

    if (!Array.isArray(files)) {
      files = [files];
    }

    const savedAssets = [];

    for (const file of files) {
      const fileName = generateUniqueFileNameWithExtension(file.name);
      const relativeUploadsDir = 'assets/uploads/photos/';
      const relativeFilePath = path.join(relativeUploadsDir, fileName).replace(/\\/g, '/');
      const absoluteUploadsDir = path.resolve(__dirname, './../../front/src/assets/uploads/photo_profile/photos/');

      // Crear directorio si no existe
      if (!fs.existsSync(absoluteUploadsDir)) {
        console.log(`Creando directorio: ${absoluteUploadsDir}`);
        fs.mkdirSync(absoluteUploadsDir, { recursive: true });
      }

      const absoluteFilePath = path.join(absoluteUploadsDir, fileName);

      console.log(`Moviendo archivo a: ${absoluteFilePath}`);
      await new Promise((resolve, reject) => {
        file.mv(absoluteFilePath, async (err) => {
          if (err) {
            console.error("Error al mover el archivo:", err);
            return reject(err);
          }

          console.log("Archivo guardado en el sistema de archivos:", absoluteFilePath);

          const asset = { path: `../../../../${relativeFilePath}` };  
          try {
            const savedAsset = await assetsModel.saveAsset(asset);
            console.log("Asset guardado correctamente:", savedAsset);

            await assetsModel.associateAssetWithUser(savedAsset.id, userId);
            console.log("Asset asociado al usuario");

            savedAssets.push(savedAsset);
            resolve();
          } catch (error) {
            console.error("Error al guardar el asset o asociar con el usuario:", error);
            reject(error);
          }
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
    throw new TypeError('Es necesario el nombre del archivo');
  }

  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileExtension = path.extname(originalFileName);

  if (!fileExtension) {
    throw new TypeError('La extension del archivo es necesaria');
  }

  return `${timestamp}-${randomString}${fileExtension}`;
}

const deleteAssetById = async (req, res) => {
  try {
    const assetId = req.params.id;
    const deleted = await assetsModel.deleteAssetById(assetId);
    if (deleted) {
      res.status(200).json({ message: 'Asset eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Asset no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error al eliminar' });
  }
};

module.exports = {
  showAssetsUser, showAsset, uploadAsset, deleteAssetById
};