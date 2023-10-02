import checkEnvironment from '../../../components/checkEnv'
import { Bike } from '../../../pages/api/db'
import BikeTripMap from '../../components/BikeTripMap'
import BikeBreakdown from '../../station/[number]/BikeBreakdown'
import Charts from './Charts'

export async function generateStaticParams() {
    try {
        const bikes = await fetch(
            checkEnvironment().concat('/api/getAllBikes'),
            { method: 'GET' },
        ).then((res) => res.json())
        return Array.from(bikes).map((bike: Bike) => ({
            bikeId: bike.bikeId,
        }))
    } catch (error) {
        console.error(error)
        return [{ bikeId: 'D32034' }]
    }
}

export default function Page({ params }) {
    const { bikeId } = params

    return (
        <div className="container biketrip-page">
            <div className="text-zone">
                <h1>Trips taken on bike number {bikeId}</h1>
            </div>
            <BikeTripMap center={[42.3342, -71.1041]} zoom={12} bikeId={bikeId} />
        </div>
    )
}
