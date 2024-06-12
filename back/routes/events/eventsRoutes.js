const {Router } = require('express');
const controlador = require('../../controllers/events/eventsController.js');
const { tokenCanAdmin, checkToken } = require('../../middlewares/abilities');
const router = Router();

router.get('/', [checkToken, tokenCanAdmin], controlador.index);
router.get('/:id', [checkToken], controlador.getEventsById);
router.post('/', [checkToken], controlador.createEvent);
router.put('/:id', [checkToken, tokenCanAdmin], controlador.updateEvent);
router.delete('/', [checkToken, tokenCanAdmin], controlador.deleteEvents);

router.get('/show/active', [checkToken, tokenCanAdmin], controlador.getActiveEvents);
router.get('/show/inactive', [checkToken, tokenCanAdmin], controlador.getInactiveEvents);
router.put('/update/activate', [checkToken, tokenCanAdmin], controlador.activateEvents);
router.put('/update/desactivate', [checkToken, tokenCanAdmin], controlador.desactivateEvents);

router.get('/search/:query', controlador.searchEvents);

module.exports = router;