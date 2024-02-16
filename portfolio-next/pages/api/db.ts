import { PrismaClient } from '@prisma/client'

export interface Ride {
    id: number
    startTime: string
    endTime: string
    member: boolean
    bikeId: number
    startingStation: { station: Station }[]
    endingStation: { station: Station }[]
}
export interface DestinationsByMonth {
    id: number
    startStationNumber: string
    endStationNumber: string
    month: string
    year: number
    count: number
}

export interface Station {
    map(
        arg0: (o: Station) => import('react').JSX.Element,
    ): unknown | null | undefined
    id: number
    number: string
    name: string
    latitude: number
    longitude: number
    district: string
    public: boolean
    totalDocks: number
    deploymentYear: number
}

export interface Bike {
    id: number
    bikeId: number
}

const prismaClientSingleton = () => {
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
