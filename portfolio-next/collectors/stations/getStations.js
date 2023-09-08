import { PrismaClient } from '@prisma/client'
import stations from '../../assets/data/current_bluebikes_stations.json'

const prisma = new PrismaClient()

async function main() {
    
    const station = await prisma.station.createMany({
        data: stations,
        skipDuplicates: true, // Skip 'Bobo'
    })
    console.log(station)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })