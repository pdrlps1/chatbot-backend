import express from 'express'
import cors from 'cors'
import chatRoutes from './routes/chat'

// Imports do Swagger:
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const app = express()
app.use(cors())
app.use(express.json())

// Configuração Swagger:
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FURIA Fan Chatbot API',
      version: '1.0.0',
      description: 'API para interação com o Chatbot da FURIA'
    },
    servers: [
      {
        url: 'http://localhost:3001'
      }
    ]
  },
  apis: ['./routes/*.ts'] // Aqui você documenta usando JSDoc nos arquivos de rota
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
  res.json({ msg: 'API FURIA Fan online!' })
})

app.use('/chat', chatRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`)
})
