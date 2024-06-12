const {Router } = require('express');
const controlador = require('../../controllers/events/userEventsController.js');
const { tokenCanAdmin, checkToken } = require('../../middlewares/abilities');
const router = Router();

router.get('/:id', [checkToken, tokenCanAdmin], controlador.getInscriptionsById);
router.post('/', [checkToken], controlador.createInscription);
router.delete('/:id', [checkToken], controlador.deleteInscription);

module.exports = router;