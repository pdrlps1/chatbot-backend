import { Router, Request, Response } from 'express'

const router = Router()

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Envia uma mensagem para o chatbot da FURIA
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 enum: [jogos, elenco, curiosidades, voltar]
 *                 example: jogos
 *     responses:
 *       200:
 *         description: Resposta do chatbot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                 options:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post('/', (req: Request, res: Response) => {
  const { message } = req.body

  let reply = ''
  let options: string[] = []

  switch (message) {
    case 'jogos':
      reply = 'Próximo jogo: FURIA x NAVI, dia 29/04 às 16h!'
      options = ['elenco', 'curiosidades', 'voltar']
      break
    case 'elenco':
      reply = 'Elenco: KSCERATO, yuurih, arT, chelo, saffee.'
      options = ['jogos', 'curiosidades', 'voltar']
      break
    case 'curiosidades':
      reply = 'A FURIA já representou o Brasil em 4 Majors!'
      options = ['jogos', 'elenco', 'voltar']
      break
    case 'voltar':
      reply = 'Escolha uma opção: jogos, elenco, curiosidades'
      options = ['jogos', 'elenco', 'curiosidades']
      break
    default:
      reply = 'Opção inválida. Use: jogos, elenco, curiosidades, voltar'
      options = ['jogos', 'elenco', 'curiosidades', 'voltar']
      break
  }

  res.json({ reply, options })
})

export default router
