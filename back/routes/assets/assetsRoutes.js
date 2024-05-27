const express = require('express');
const router = express.Router();
const assetsController = require('../../controllers/assetsController');

router.get('/user/:id', assetsController.showAssetsUser);
router.get('/:id', assetsController.showAsset);
router.post('/upload', /* uploadFile, */ assetsController.uploadAsset);

module.exports = router;