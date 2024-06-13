const { Router } = require('express');
const controlador = require('../../controllers/preferences/userPreferencesController.js');
const { check } = require('express-validator');
const { validateFilds, checkDiferenceAsign } = require('../../middlewares/validators.js');
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanSocio } = require('../../middlewares/abilities');
const router = Router();

router.get('/', /* [checkToken],  */controlador.index);
router.get('/:userId', /* [checkToken],  */controlador.getUserPreferencesById);
router.post('/:userId', /* [checkToken], */ controlador.createUserPreference);
router.put('/:userId', /* [checkToken],  */controlador.updateUserPreference);
router.delete('/:userId', /* [checkToken],  */controlador.deleteUserPreference);

router.get('/options/relation', /* [checkToken],  */controlador.getOptionsRelation);
router.get('/options/interest', /* [checkToken],  */controlador.getOptionsInterest);

module.exports = router;