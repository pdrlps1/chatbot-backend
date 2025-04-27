import { Router, Request, Response } from 'express'

/**
 * @swagger
 * components:
 *   schemas:
 *     ChatHistoryItem:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           example: Pedro
 *         message:
 *           type: string
 *           example: Qual o próximo jogo da FURIA?
 *         response:
 *           type: string
 *           example: O próximo jogo é amanhã às 20h.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2025-04-26T23:38:42.179Z"
 */

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Retorna o histórico de mensagens do chatbot
 *     tags: [History]
 *     responses:
 *       200:
 *         description: Lista de mensagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChatHistoryItem'
 *   post:
 *     summary: Adiciona uma mensagem ao histórico do chatbot
 *     tags: [History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - message
 *               - response
 *             properties:
 *               user:
 *                 type: string
 *                 example: Pedro
 *               message:
 *                 type: string
 *                 example: Qual o próximo jogo da FURIA?
 *               response:
 *                 type: string
 *                 example: O próximo jogo é amanhã às 20h.
 *     responses:
 *       201:
 *         description: Mensagem adicionada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatHistoryItem'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Os campos user, message e response são obrigatórios e devem ser strings.
 */

export interface ChatHistoryItem {
  user: string
  message: string
  response: string
  timestamp: string
}

const chatHistory: ChatHistoryItem[] = []

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json(chatHistory)
})

router.post('/', (req: Request, res: Response) => {
  const { user, message, response } = req.body

  if (typeof user !== 'string' || typeof message !== 'string' || typeof response !== 'string') {
    return res.status(400).json({ error: 'Os campos user, message e response são obrigatórios e devem ser strings.' })
  }

  const entry: ChatHistoryItem = {
    user,
    message,
    response,
    timestamp: new Date().toISOString(),
  }
  chatHistory.push(entry)
  res.status(201).json(entry)
})

export default router
