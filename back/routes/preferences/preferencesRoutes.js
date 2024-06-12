const { Router } = require('express');
const controlador = require('../../controllers/preferences/preferencesController.js');
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanSocio } = require('../../middlewares/abilities');
const router = Router();

router.get('/', /* [checkToken, tokenCanAdmin], */ controlador.index);
router.get('/:id', /* [checkToken], */ controlador.getPreferencesById);
router.post('/', /* [checkToken], */ controlador.createPreference);
router.put('/:id', /* [checkToken], */ controlador.updatePreference);
router.delete('/:id', /* [checkToken], */ controlador.deletePreference);

router.get('/options/relation', /* [checkToken], */ controlador.getOptionsRelation);
router.get('/options/interest', /* [checkToken], */ controlador.getOptionsInterest);

module.exports = router;