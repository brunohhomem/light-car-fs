import axios from 'axios'
import { AppError } from '../utils/AppError'

export async function fetchRouteFromGoogle(
  origin: string,
  destination: string
) {
  const apiKey = process.env.GOOGLE_API_KEY
  const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&key=${apiKey}`

  const googleResponse = await axios.get(googleMapsUrl)
  const route = googleResponse.data.routes[0]

  if (!route) {
    throw new AppError(
      'Não foi possível calcular a rota entre os pontos.',
      400,
      'ROUTE_NOT_FOUND'
    )
  }

  const distanceInMeters = route.legs[0].distance.value
  const duration = route.legs[0].duration.text

  return {
    startLocation: {
      latitude: route.legs[0].start_location.lat,
      longitude: route.legs[0].start_location.lng
    },
    endLocation: {
      latitude: route.legs[0].end_location.lat,
      longitude: route.legs[0].end_location.lng
    },
    distanceInKm: distanceInMeters / 1000,
    duration,
    routeResponse: googleResponse.data
  }
}
