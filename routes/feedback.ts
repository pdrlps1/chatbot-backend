import { Router, Request, Response } from 'express'

export interface FeedbackItem {
  user: string
  rating: number
  comment: string
  timestamp: string
}

const feedbackList: FeedbackItem[] = []

const router = Router()

/**
 * @openapi
 * /feedback:
 *   get:
 *     summary: Retorna todos os feedbacks enviados
 *     tags:
 *       - Feedback
 *     responses:
 *       200:
 *         description: Lista de feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FeedbackItem'
 */
router.get('/', (req: Request, res: Response) => {
  res.json(feedbackList)
})

/**
 * @openapi
 * /feedback:
 *   post:
 *     summary: Envia um feedback
 *     tags:
 *       - Feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackItemInput'
 *     responses:
 *       201:
 *         description: Feedback enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackItem'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Campos inválidos. user(string), rating(number), comment(string) são obrigatórios."
 */
router.post('/', (req: Request, res: Response) => {
  const { user, rating, comment } = req.body

  if (typeof user !== 'string' || typeof rating !== 'number' || typeof comment !== 'string') {
    return res.status(400).json({ error: 'Campos inválidos. user(string), rating(number), comment(string) são obrigatórios.' })
  }

  const feedback: FeedbackItem = {
    user,
    rating,
    comment,
    timestamp: new Date().toISOString()
  }
  feedbackList.push(feedback)
  res.status(201).json(feedback)
})

export default router

/**
 * @openapi
 * components:
 *   schemas:
 *     FeedbackItemInput:
 *       type: object
 *       required:
 *         - user
 *         - rating
 *         - comment
 *       properties:
 *         user:
 *           type: string
 *           example: "torcedor123"
 *         rating:
 *           type: number
 *           example: 5
 *         comment:
 *           type: string
 *           example: "Ótimo atendimento do chatbot!"
 *     FeedbackItem:
 *       allOf:
 *         - $ref: '#/components/schemas/FeedbackItemInput'
 *         - type: object
 *           properties:
 *             timestamp:
 *               type: string
 *               format: date-time
 *               example: "2025-04-27T12:34:56.000Z"
 */
