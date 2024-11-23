import Fastify from 'fastify'
import estimateRide from './routes/estimateRideRoute'
import confirmRide from './routes/confirmRideRoute'
// import getRideHistory from './routes/getRideHistory'

const fastify = Fastify({ logger: true })

// Registrar rotas
fastify.register(estimateRide, { prefix: '/ride/estimate' })
fastify.register(confirmRide, { prefix: '/ride/confirm' })
// fastify.register(getRideHistory, { prefix: '/ride/:customer_id' })

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
