import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: 'SUA_API_KEY_AQUI', // Substitua pela chave da sua API
});

export const createAssistantService = async () => {
  const ctbData = fs.readFileSync('src/data/ctbData.txt', 'utf8');

  // Criação do assistente personalizado
  const assistant = await openai.beta.assistants.create({
    name: 'Via',
    instructions: `Você é a Via uma assistente especializada sobre questões judiciais baseadas no Código de Trânsito Brasileiro. Use o seguinte texto como base para responder perguntas e fornecer explicações claras: \n\n"${ctbData}"`,
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-3.5-turbo-0125',
  });

  console.log('Assistente criado com sucesso!', assistant);
  return assistant;
};

export const askAssistantService = async (userMessage) => {
  // Envia a mensagem para o assistente
  const response = await openai.chat({
    messages: [{ role: 'user', content: userMessage }],
  });

  const botMessage = response.choices[0]?.message?.content || 'Desculpe, não consegui entender sua pergunta.';
  return { botMessage };
};
