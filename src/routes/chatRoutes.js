import express from 'express';
import { createAssistant, askAssistant, getChatHistory } from '../controllers/chatController.js';

const router = express.Router();

router.post('/create-assistant', createAssistant);

router.post('/ask-assistant', askAssistant);

router.get('/chat-history/:chatId', getChatHistory);

export default router;
