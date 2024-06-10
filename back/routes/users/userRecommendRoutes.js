const express = require('express');
const router = express.Router();
const controlador = require('../../controllers/users/recommendationUserController');

router.get('/:userId', controlador.recommendUsers);

module.exports = router;
