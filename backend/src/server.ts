import Fastify from 'fastify'
import cors from '@fastify/cors'
import estimateRide from './routes/estimateRideRoute'
import confirmRide from './routes/confirmRideRoute'
import getRideHistory from './routes/getRideHistoryRoute'

const fastify = Fastify({ logger: true })

fastify.register(cors, {
  origin: true, // Permitir apenas o frontend específico
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
  allowedHeaders: ['Content-Type'] // Cabeçalhos permitidos
})

fastify.register(estimateRide, { prefix: '/ride/estimate' })
fastify.register(confirmRide, { prefix: '/ride/confirm' })
fastify.register(getRideHistory, { prefix: '/ride' }) // Corrigido o prefixo aqui

const start = async () => {
  try {
    await fastify.listen({ port: 8080, host: '0.0.0.0' })
    console.log('Server running: http://localhost:8080')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
