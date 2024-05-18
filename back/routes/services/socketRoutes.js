const { Router } = require('express');
const { getUserChatsController } = require('../../controllers/services/socketController');
const { checkToken } = require('../../middlewares/abilities');
const router = Router();

router.get('/:userId', /* checkToken, */ getUserChatsController);

module.exports = router;
