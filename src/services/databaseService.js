import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '143.106.241.4',
  user: 'cl203074',
  password: 'cl*09072007',
  database: 'cl203074',
});

export const createChatRecord = async () => {
  const [result] = await pool.query('INSERT INTO chats () VALUES ()');
  return result.insertId;
};

export const saveChatMessage = async (chatId, userMessage, botMessage) => {
  await pool.query('INSERT INTO messages (chat_id, user_message, bot_message) VALUES (?, ?, ?)', [chatId, userMessage, botMessage]);
};

export const getChatMessages = async (chatId) => {
  const [rows] = await pool.query('SELECT user_message, bot_message FROM messages WHERE chat_id = ?', [chatId]);
  return rows;
};
