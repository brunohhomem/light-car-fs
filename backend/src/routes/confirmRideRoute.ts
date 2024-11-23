import { FastifyInstance } from 'fastify'
import { validateConfirmRide, saveRide, getDriverById } from '../services/index'
import { ConfirmRideProps } from '../types/index'
import { AppError } from '../utils/AppError'

const confirmRide = async (fastify: FastifyInstance) => {
  fastify.patch('/', async (request, response) => {
    const body = request.body as ConfirmRideProps

    try {
      validateConfirmRide(body)

      const driver = await getDriverById(body.driver.id)

      if (!driver) {
        throw new AppError('Motorista não encontrado.', 404, 'DRIVER_NOT_FOUND')
      }

      if (body.distance < driver.minDistance) {
        throw new AppError(
          'A distância da viagem é menor do que a mínima aceita pelo motorista.',
          400,
          'INVALID_DISTANCE'
        )
      }

      const ride = await saveRide({
        customer_id: body.customer_id,
        origin: body.origin,
        destination: body.destination,
        distance: body.distance,
        duration: body.duration,
        driver_id: driver.id,
        value: body.value
      })

      return response.send({
        success: true,
        ride
      })
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.status).send({
          error: error.code,
          message: error.message
        })
      }

      console.error('Erro inesperado:', error)
      return response.status(500).send({
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Ocorreu um erro interno.'
      })
    }
  })
}

export default confirmRide
