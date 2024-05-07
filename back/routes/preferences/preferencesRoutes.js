const { Router } = require('express');
const controlador = require('../../controllers/preferences/preferencesController.js');
const { check } = require('express-validator');
const { validateFilds, checkDiferenceAsign } = require('../../middlewares/validators.js');
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanSocio } = require('../../middlewares/abilities');
const router = Router();

router.get('/', /*[checkToken, tokenCanAdmin],*/ controlador.index);
/* router.get('/:id', controlador.getRolById);
router.put('/:id', /* [checkToken, tokenCanAdmin], controlador.updateRol );
 */
module.exports = router;