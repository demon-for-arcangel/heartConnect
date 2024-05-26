const express = require('express');
const router = express.Router();
const assetsController = require('../controllers/assetsController');

// Ruta para obtener los activos de un usuario
router.get('/user/:id/assets', assetsController.showAssetsUser);

// Ruta para obtener un activo específico por su ID
router.get('/asset/:id', assetsController.showAsset);

// Otras rutas relacionadas con los activos podrían ir aquí, por ejemplo, para crear o eliminar activos
// router.post('/asset', assetsController.createAsset);
// router.delete('/asset/:id', assetsController.deleteAsset);

module.exports = router;
