import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAvailableDrivers(distanceInKm: number) {
  const drivers = await prisma.driver.findMany()

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
      value: parseFloat((driver.ratePerKm * distanceInKm).toFixed(2))
    }))
    .sort((a, b) => a.value - b.value) // Ordenar pelo preço mais barato
}

export async function getDriverById(driverId: number) {
  return prisma.driver.findUnique({
    where: { id: driverId }
  })
}
