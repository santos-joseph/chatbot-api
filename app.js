import express from 'express'
import bodyParser from 'body-parser'
import chatRoutes from './src/routes/chatRoutes.js';  // Correto

const app = express()
app.use(bodyParser.json())
app.use('/chats', chatRoutes)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
