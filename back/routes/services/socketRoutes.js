const { Router } = require('express');
const { getUserChatsCon, getChatMessagesCon } = require('../../controllers/services/socketController');
const { checkToken } = require('../../middlewares/abilities');
const router = Router();

router.get('/:userId', /* checkToken, */ getUserChatsCon);
router.get('/messages/:chatId', getChatMessagesCon);

module.exports = router;
