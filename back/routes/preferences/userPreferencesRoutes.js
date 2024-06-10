const { Router } = require('express');
const controlador = require('../../controllers/preferences/userPreferencesController.js');
const { check } = require('express-validator');
const { validateFilds, checkDiferenceAsign } = require('../../middlewares/validators.js');
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanSocio } = require('../../middlewares/abilities');
const router = Router();

router.get('/', /*[checkToken, tokenCanAdmin],*/ controlador.index);
router.get('/:userId', controlador.getUserPreferencesById);
router.post('/:userId', controlador.createUserPreference);
router.put('/:userId', controlador.updateUserPreference);
router.delete('/:userId', controlador.deleteUserPreference);

router.get('/options/relation', controlador.getOptionsRelation);
router.get('/options/interest', controlador.getOptionsInterest);

module.exports = router;