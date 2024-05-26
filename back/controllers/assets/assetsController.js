const { response, request } = require("express");
const Conexion = require("../database/assetsConnection");

const showAssetsUser = (req, res = response) => {
  const conx = new Conexion();

  conx.getAssetsOfUser(req.params.id)
    .then((assets) => {
      res.status(200).json(assets);
    })
    .catch((err) => {
      console.error(err); // Opcional: log de errores para depuración
      res.status(404).json({ msg: "User has no assets" });
    });
};

const showAsset = (req, res = response) => {
  const conx = new Conexion();

  // Obtener un activo específico por su ID
  conx.getAssetById(req.params.id)
    .then((asset) => {
      res.status(200).json(asset);
    })
    .catch((err) => {
      console.error(err); // Opcional: log de errores para depuración
      res.status(404).json({ msg: "Asset not found" });
    });
};

module.exports = {
    showAssetsUser,
    showAsset
};
