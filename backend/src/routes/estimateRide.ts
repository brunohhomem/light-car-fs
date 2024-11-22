import fastify, { FastifyInstance } from 'fastify'

interface EstimateRideProps {
  customer_id: string
  origin: string
  destination: string
}

const estimateRide = async (fastify: FastifyInstance) => {
  fastify.post('/', async (request, response) => {
    if (!request.body || Object.keys(request.body).length === 0) {
      return response.status(400).send({
        error: 'INVALID_DATA',
        message: 'Corpo da requisição está vazio.'
      })
    }

    const { customer_id, origin, destination } =
      request.body as EstimateRideProps

    if (!customer_id || !origin || !destination) {
      return response
        .status(400)
        .send({ error: 'INVALID_DATA', message: 'Preencha todos os campos' })
    }

    return response.send({
      origin,
      destination,
      options: [
        { id: 1, name: 'Homer Simpson', value: 25.0 },
        { id: 2, name: 'Dominic Toretto', value: 50.0 },
        { id: 3, name: 'James Bond', value: 100.0 }
      ]
    })
  })
}

export default estimateRide
