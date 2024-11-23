import { FastifyInstance } from 'fastify'
import {
  validateRequest,
  fetchRouteFromGoogle,
  getAvailableDrivers
} from '../services/index'
import { EstimateRideProps } from '../types/index'
import { AppError } from '../utils/AppError'

const estimateRide = async (fastify: FastifyInstance) => {
  fastify.post('/', async (request, response) => {
    const body = request.body as EstimateRideProps

    try {
      validateRequest(body)

      const { startLocation, endLocation, distanceInKm, duration } =
        await fetchRouteFromGoogle(body.origin, body.destination)

      const availableDrivers = await getAvailableDrivers(distanceInKm)

      return response.send({
        origin: startLocation,
        destination: endLocation,
        distance: distanceInKm,
        duration,
        options: availableDrivers
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

export default estimateRide
