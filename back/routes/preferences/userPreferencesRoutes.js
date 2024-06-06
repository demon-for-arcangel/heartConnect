const { Router } = require('express');
const controlador = require('../../controllers/preferences/userPreferencesController.js');
const { check } = require('express-validator');
const { validateFilds, checkDiferenceAsign } = require('../../middlewares/validators.js');
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanSocio } = require('../../middlewares/abilities');
const router = Router();

router.get('/', /*[checkToken, tokenCanAdmin],*/ controlador.index);
router.get('/:userId', controlador.getPreferencesById);
router.post('/', controlador.createPreference);
router.put('/:userId', controlador.updatePreference);
router.delete('/:userId', controlador.deletePreference);

module.exports = router;