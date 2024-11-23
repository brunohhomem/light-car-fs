import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.customer.createMany({
    data: [
      { id: '7602cec0-06f3-4802-a931-e789820c1387' },
      { id: 'db978fe5-6a8f-41ae-956c-a57817f85cf3' },
      { id: '2d11d4b8-c8fc-49eb-82ba-77ce738b0413' },
      { id: '39a9a9eb-0531-4e99-a1a4-40695eb932af' },
      { id: '7066e0ff-5de5-41eb-8a68-d2ab87581601' }
    ]
  })

  const drivers = [
    {
      id: 1,
      name: 'Homer Simpson',
      description:
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
      rating: 2,
      comment:
        'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      ratePerKm: 2.5,
      minDistance: 0
    },
    {
      id: 2,
      name: 'Dominic Toretto',
      description:
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      vehicle: 'Dodge Charger R/T 1970 modificado',
      rating: 4,
      comment:
        'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
      ratePerKm: 5.0,
      minDistance: 5
    },
    {
      id: 3,
      name: 'James Bond',
      description:
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      vehicle: 'Aston Martin DB5 clássico',
      rating: 5,
      comment:
        'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
      ratePerKm: 10.0,
      minDistance: 10
    }
  ]

  for (const driver of drivers) {
    await prisma.driver.upsert({
      where: { id: driver.id },
      update: {},
      create: driver
    })
  }

  console.log('Seeding completed!')
}

seed()
