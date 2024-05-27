const {Router } = require('express');
const controlador = require('../../controllers/users/userFriendshipController');
const { check } = require('express-validator');
const { validateFilds, checkDiferenceAsign } = require('../../middlewares/validators.js');
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanSocio } = require('../../middlewares/abilities');
const router = Router();

router.get('/:id', controlador.showFriendship);//corregir esta funcion


module.exports = router;