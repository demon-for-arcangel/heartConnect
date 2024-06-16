const { response } = require("express");
const fs = require('fs');
const path = require('path');
const AssetsModel = require("../database/assetsConnection");
const conx = new AssetsModel();

const showAssetsUser = async (req, res = response) => {
  try {
    const assets = await conx.getAssetsOfUser(req.params.id);
    res.status(200).json(assets);
  } catch (err) {
    res.status(404).json({ msg: "Usuario no tiene assets" });
  }
};

const showAsset = async (req, res = response) => {
  try {
    const assetId = parseInt(req.params.id);

    if (isNaN(assetId)) {
      throw new Error('Id de asset no válido');
    }

    const asset = await conx.getAssetById(assetId);
    if (asset) {
      const relativePath = path.relative(__dirname, path.join(__dirname, 'assets/uploads/photo_profile/', path.basename(asset.path)));
      const normalizedPath = relativePath.replace(/\\/g, '/');
      res.status(200).json({ filePath: normalizedPath });
    } else {
      res.status(404).json({ msg: "Asset no encontrado" });
    }

  } catch (err) {
    res.status(404).json({ msg: "Asset no encontrado" });
  }
};

const updatePhotoProfile = async (req, res = response) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      throw new Error('Id de usuario no válido');
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No se ha subido ningún archivo.');
    }

    const file = req.files.photo_profile;
    const fileName = file.name;
    const uploadDir = path.join(__dirname, './../../front/src/assets/uploads/photo_profile/');
    const uploadPath = path.join(uploadDir, fileName);
    const relativePath = `assets/uploads/photo_profile/${fileName}`;

    file.mv(uploadPath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      try {
        const assetId = await conx.addAsset(relativePath);
        await conx.updateUserProfilePhoto(userId, assetId);
        res.status(200).json({ msg: "Foto de perfil actualizada", filePath: relativePath });
      } catch (error) {
        res.status(500).json({ msg: "Error al actualizar la foto de perfil" });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar la foto de perfil" });
  }
}

const uploadAsset = async (req, res = response) => {
  try {
    const contentType = req.headers['content-type'];
    const userId = req.headers['user-id'];

    if (!userId) {
      return res.status(400).json({ msg: "User ID is required in headers" });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No file was uploaded" });
    }

    let files = req.files.file;

    if (!Array.isArray(files)) {
      files = [files];
    }

    const savedAssets = [];

    for (const file of files) {
      const fileName = generateUniqueName(file.name);
      const relativeUploadsDir = 'assets/uploads/photos/';
      const relativeFilePath = path.join(relativeUploadsDir, fileName).replace(/\\/g, '/');
      const absoluteUploadsDir = path.resolve(__dirname, './../../front/src/assets/uploads/photos/');

      if (!fs.existsSync(absoluteUploadsDir)) {
        fs.mkdirSync(absoluteUploadsDir, { recursive: true });
      }

      const absoluteFilePath = path.join(absoluteUploadsDir, fileName);

      await new Promise((resolve, reject) => {
        file.mv(absoluteFilePath, async (err) => {
          if (err) {
            return reject(err);
          }

          const asset = { path: `/${relativeFilePath}` };  
          try {
            const savedAsset = await conx.saveAsset(asset);

            await conx.associateAssetWithUser(savedAsset.id, userId);

            savedAssets.push({ id_user: userId, Asset: savedAsset });
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      });
    }

    res.status(201).json(savedAssets);

  } catch (err) {
    res.status(500).json({ msg: "Error al subir el archivo" });
  }
};

function generateUniqueName(originalFileName) {
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
    const deleted = await conx.deleteAssetById(assetId);
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
  showAssetsUser, showAsset, uploadAsset, deleteAssetById, updatePhotoProfile,
};