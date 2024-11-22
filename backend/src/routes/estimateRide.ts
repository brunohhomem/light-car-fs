import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import fastify, { FastifyInstance } from 'fastify'

interface EstimateRideProps {
  customer_id: string
  origin: string
  destination: string
}

const prisma = new PrismaClient()

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

    if (origin === destination) {
      return response.status(400).send({
        error: 'INVALID_DATA',
        message: 'A origem e o destino devem ser diferentes.'
      })
    }

    try {
      // Chamada à API do Google Maps para calcular a rota
      const apiKey = process.env.GOOGLE_API_KEY
      const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
        origin
      )}&destination=${encodeURIComponent(destination)}&key=${apiKey}`

      const googleResponse = await axios.get(googleMapsUrl)
      const route = googleResponse.data.routes[0]

      if (!route) {
        return response.status(400).send({
          error: 'ROUTE_NOT_FOUND',
          message: 'Não foi possível calcular a rota entre os pontos.'
        })
      }

      // Distância e duração
      const distanceInMeters = route.legs[0].distance.value
      const duration = route.legs[0].duration.text
      const distanceInKm = distanceInMeters / 1000

      // Coordenadas de origem e destino
      const startLocation = {
        latitude: route.legs[0].start_location.lat,
        longitude: route.legs[0].start_location.lng
      }

      const endLocation = {
        latitude: route.legs[0].end_location.lat,
        longitude: route.legs[0].end_location.lng
      }

      // Buscar motoristas no banco
      const drivers = await prisma.driver.findMany()

      // Filtrar motoristas disponíveis e calcular o custo
      const availableDrivers = drivers
        .filter(driver => driver.minDistance <= distanceInKm)
        .map(driver => ({
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          review: {
            rating: driver.rating,
            comment: driver.comment
          },
          value: parseFloat((driver.ratePerKm * distanceInKm).toFixed(2))
        }))
        .sort((a, b) => a.value - b.value) // Ordenar pelo preço mais barato

      // Retorno final
      return response.send({
        origin: startLocation,
        destination: endLocation,
        distance: distanceInKm,
        duration,
        options: availableDrivers
      })
    } catch (error) {
      console.error('Erro ao calcular a rota:', error)
      return response.status(500).send({
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Ocorreu um erro ao processar a solicitação.'
      })
    }
  })
}

export default estimateRide
