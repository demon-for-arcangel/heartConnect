const express = require('express');
const router = express.Router();
const assetsController = require('../controllers/assetsController');

router.get('/user/:id/assets', assetsController.showAssetsUser);
router.get('/asset/:id', assetsController.showAsset);
router.post('/upload', assetsController.uploadAsset);

module.exports = router;
