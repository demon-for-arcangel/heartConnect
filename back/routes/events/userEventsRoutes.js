const {Router } = require('express');
const controlador = require('../../controllers/events/userEventsController.js');
const { check } = require('express-validator');
const { validateFilds, checkDiferenceAsign } = require('../../middlewares/validators.js');
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanSocio } = require('../../middlewares/abilities');
const router = Router();

router.get('/:id', /*[checkToken, tokenCanAdmin],*/ controlador.getInscriptionsById);
router.post('/', controlador.createInscription);
router.delete('/:id', controlador.deleteInscription);

module.exports = router;