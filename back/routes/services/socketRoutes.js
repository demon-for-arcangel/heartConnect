const { Router } = require('express');
const { getUserChatsCon, getChatMessagesCon, createChat } = require('../../controllers/services/socketController');
const { checkToken } = require('../../middlewares/abilities');
const router = Router();

router.get('/:userId', /* checkToken, */ getUserChatsCon);
router.get('/messages/:chatId', /* checkToken, */ getChatMessagesCon);
router.post('/new', /* checkToken, */ createChat);

module.exports = router;
