const {Router } = require('express');
const controlador = require('../../controllers/events/eventsController.js');
const { check } = require('express-validator');
const { validateFilds, checkDiferenceAsign } = require('../../middlewares/validators.js');
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanSocio } = require('../../middlewares/abilities');
const router = Router();

router.get('/', /*[checkToken, tokenCanAdmin],*/ controlador.index);
router.get('/:id', controlador.getEventsById);
router.post('/', controlador.createEvent);
router.put('/:id', controlador.updateEvent);
router.delete('/', controlador.deleteEvents);

router.get('/show/active', controlador.getActiveEvents);
router.get('/show/inactive', controlador.getInactiveEvents);
router.put('/update/activate', /* [checkToken, tokenCanAdmin], */controlador.activateEvents);
router.put('/update/desactivate', /* [checkToken, tokenCanAdmin], */controlador.desactivateEvents);


module.exports = router;