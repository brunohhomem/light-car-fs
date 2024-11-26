'use client'

import { EstimateRideResponse } from '@/types'

interface MapProps {
  estimateData: EstimateRideResponse
}

export default function Map({ estimateData }: MapProps) {
  const { origin, destination, routeResponse } = estimateData
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&maptype=roadmap&markers=color:blue%7Clabel:O%7C${origin.latitude},${origin.longitude}&markers=color:red%7Clabel:D%7C${destination.latitude},${destination.longitude}&path=color:0xff0000ff|weight:2|${origin.latitude},${origin.longitude}|${destination.latitude},${destination.longitude}&key=${googleMapsApiKey}`

  console.log(routeResponse)
  // console.log(routeResponse.routes[0].legs)

  return (
    <div className="w-full max-w-md justify-center">
      <h3 className="text-lg font-semibold mb-2">Rota da Viagem</h3>
      <img src={mapUrl} alt="Mapa da rota" className="rounded-md shadow-lg" />
    </div>
  )
}
