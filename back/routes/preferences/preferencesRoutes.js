const { Router } = require('express');
const controlador = require('../../controllers/preferences/preferencesController.js');
const { check } = require('express-validator');
const { validateFilds, checkDiferenceAsign } = require('../../middlewares/validators.js');
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanSocio } = require('../../middlewares/abilities');
const router = Router();

router.get('/', /*[checkToken, tokenCanAdmin],*/ controlador.index);
router.get('/:id', controlador.getPreferencesById);
router.post('/', controlador.createPreference);
router.put('/:id', controlador.updatePreference);
router.delete('/:id', controlador.deletePreference);

router.get('/options/relation', controlador.getOptionsRelation);
router.get('/options/interest', controlador.getOptionsInterest);

module.exports = router;