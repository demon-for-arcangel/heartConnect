const express = require('express');
const router = express.Router();
const controlador = require('../../controllers/users/recommendationUserController');
const { checkToken } = require('../../middlewares/abilities');

router.get('/:userId', /* checkToken, */ controlador.recommendUsers);

module.exports = router;
