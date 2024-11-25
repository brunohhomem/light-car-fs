import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAvailableDrivers(distanceInKm: number) {
  const drivers = await prisma.driver.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      vehicle: true,
      rating: true,
      comment: true,
      ratePerKm: true,
      minDistance: true
    }
  })

  return drivers
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
      min_distance: driver.minDistance,
      value: parseFloat((driver.ratePerKm * distanceInKm).toFixed(2))
    }))
    .sort((a, b) => a.value - b.value)
}

export async function getDriverById(driverId: number) {
  return prisma.driver.findUnique({
    where: { id: driverId }
  })
}
