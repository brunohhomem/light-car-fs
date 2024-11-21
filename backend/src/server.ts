import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.get('/', async () => {
  return { message: 'Hello, Light Car!' }
})

app.get('/users', async () => {
  return await prisma.user.findMany()
})

const start = async () => {
  try {
    await app.listen({ port: 8080 })
    console.log('Server running on http://localhost:8080')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
