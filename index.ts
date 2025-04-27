import express from 'express'
import cors from 'cors'
import chatRoutes from './routes/chat'
import historyRoutes from './routes/history'
import feedbackRoutes from './routes/feedback' // Se já tiver criado

// Swagger imports
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FURIA Fan Chatbot API',
      version: '1.0.0',
      description: 'API para interação com o Chatbot da FURIA',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./routes/*.ts'], // Pega as anotações dos arquivos de rotas (JSDoc)
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

const app = express()
app.use(cors())
app.use(express.json())

// Swagger UI (http://localhost:3001/api-docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
  res.json({ msg: 'API FURIA Fan online!' })
})

app.use('/chat', chatRoutes)
app.use('/history', historyRoutes)
app.use('/feedback', feedbackRoutes) // Se já estiver pronto

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`)
})
