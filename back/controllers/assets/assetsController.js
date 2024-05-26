const { response } = require("express");
const AssetsModel = require("../database/assetsModel");
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
    res.status(200).json(asset);
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
      const fileContent = buffer.toString('binary');
      const fileName = req.headers['file-name'];

      // Guardar en el sistema de archivos
      const filePath = `/path/to/save/${fileName}`;
      // Aquí usarías fs.writeFileSync(filePath, fileContent, 'binary');

      // Guardar en la base de datos
      const asset = {
        path: filePath,
        // Agrega otros campos necesarios aquí
      };

      const savedAsset = await assetsModel.saveAsset(asset);
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
