const express = require('express');
const router = express.Router();
const assetsController = require('../../controllers/assetsController');
const { checkToken } = require('../../middlewares/abilities');

router.get('/user/:id', checkToken, assetsController.showAssetsUser);
router.get('/:id', checkToken, assetsController.showAsset);
router.post('/upload', checkToken, assetsController.uploadAsset);
router.delete('/:id', assetsController.deleteAssetById);

module.exports = router;