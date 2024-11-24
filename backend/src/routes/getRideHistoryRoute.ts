import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getRides = async (fastify: FastifyInstance) => {
  fastify.get('/:customer_id', async (request, response) => {
    // Rota corrigida
    const { customer_id } = request.params as { customer_id: string }
    const { driver_id } = request.query as { driver_id?: string }

    try {
      if (!customer_id || customer_id.trim() === '') {
        return response.status(400).send({
          error_code: 'INVALID_CUSTOMER_ID',
          error_description: 'O ID do cliente não pode estar em branco.'
        })
      }

      if (driver_id && isNaN(Number(driver_id))) {
        return response.status(400).send({
          error_code: 'INVALID_DRIVER',
          error_description: 'O ID do motorista informado não é válido.'
        })
      }

      const whereClause: any = {
        customerId: customer_id
      }

      if (driver_id) {
        whereClause.driverId = Number(driver_id)
      }

      const rides = await prisma.ride.findMany({
        where: whereClause,
        orderBy: {
          date: 'desc'
        },
        include: {
          driver: true
        }
      })

      if (rides.length === 0) {
        return response.status(404).send({
          error_code: 'NO_RIDES_FOUND',
          error_description: 'Nenhuma viagem encontrada para este cliente.'
        })
      }

      const ridesResponse = rides.map(ride => ({
        id: ride.id,
        date: ride.date,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: ride.driver.id,
          name: ride.driver.name
        },
        value: ride.value
      }))

      return response.send({
        customer_id,
        rides: ridesResponse
      })
    } catch (error) {
      console.error('Erro ao buscar viagens:', error)
      return response.status(500).send({
        error_code: 'INTERNAL_SERVER_ERROR',
        error_description: 'Ocorreu um erro ao processar a solicitação.'
      })
    }
  })
}

export default getRides
