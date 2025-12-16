// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Create a dummy Merchant (You)
  const user = await prisma.user.upsert({
    where: { email: 'demo@portfolio.com' },
    update: {},
    create: {
      email: 'demo@portfolio.com',
      name: 'Portfolio Barber',
      services: {
        create: [
          { name: 'Fade Cut', price: 3000, duration: 30 },
          { name: 'Beard Trim', price: 1500, duration: 15 },
          { name: 'Full Service', price: 5000, duration: 60 },
        ],
      },
    },
  })

  // 2. Create some past/future bookings to make charts look good
  await prisma.booking.createMany({
    data: [
      {
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
        status: 'CONFIRMED',
        serviceId: (await prisma.service.findFirst({ where: { name: 'Fade Cut' } }))!.id,
        userId: user.id,
      },
      {
        customerName: 'Alice Smith',
        customerEmail: 'alice@example.com',
        date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
        status: 'PENDING',
        serviceId: (await prisma.service.findFirst({ where: { name: 'Full Service' } }))!.id,
        userId: user.id,
      },
    ],
  })

  console.log('Seed data inserted.')
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
