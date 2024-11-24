import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAvailableDrivers(distanceInKm: number) {
  // Certifique-se de que está incluindo `minDistance` no retorno do banco
  const drivers = await prisma.driver.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      vehicle: true,
      rating: true,
      comment: true,
      ratePerKm: true,
      minDistance: true // Incluindo o campo `minDistance`
    }
  })

  // Filtrar e mapear os dados
  return drivers
    .filter(driver => driver.minDistance <= distanceInKm) // Filtra motoristas pela distância mínima
    .map(driver => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.rating,
        comment: driver.comment
      },
      min_distance: driver.minDistance, // Inclui a distância mínima no retorno
      value: parseFloat((driver.ratePerKm * distanceInKm).toFixed(2))
    }))
    .sort((a, b) => a.value - b.value) // Ordena por valor da corrida
}

export async function getDriverById(driverId: number) {
  return prisma.driver.findUnique({
    where: { id: driverId }
  })
}
