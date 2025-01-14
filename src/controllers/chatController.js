import { createAssistantService, askAssistantService } from '../services/openaiService.js';
import { createChatRecord, saveChatMessage, getChatMessages } from '../services/databaseService.js';

export const createAssistant = async (req, res) => {
  try {
    const assistant = await createAssistantService();
    res.json(assistant);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar assistente');
  }
};

export const askAssistant = async (req, res) => {
  try {
    const { chatId, userMessage } = req.body;

    const chatRecordId = await createChatRecord();

    const { botMessage } = await askAssistantService(userMessage);

    await saveChatMessage(chatRecordId, userMessage, botMessage);

    res.json({ chatId: chatRecordId, botMessage });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao interagir com o assistente');
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await getChatMessages(chatId);
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter histórico de mensagens');
  }
};
