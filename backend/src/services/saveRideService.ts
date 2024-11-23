import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function saveRide(data: {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver_id: number
  value: number
}) {
  return prisma.ride.create({
    data: {
      customerId: data.customer_id,
      driverId: data.driver_id,
      origin: data.origin,
      destination: data.destination,
      distance: data.distance,
      duration: data.duration,
      value: data.value,
      date: new Date()
    }
  })
}
