"use client";
import checkEnvironment from '../../../components/checkEnv';
import StartTable from './StartTable';

export async function generateStaticParams() {
    const stations = await fetch(checkEnvironment().concat('/api/getStations'), { method: 'GET' }).then((res) => res.json())
    return Array.from(stations).map((station: {
        id: number,
        number: String,
        name: String,
        latitude: number,
        longitude: number,
        district: String,
        public: Boolean,
        totalDocks: number,
        deploymentYear: number
    }) => ({
        number: station.number
    }))
}

export default function Page({params}) {
    const { number } = params

    return (
        <div className="container station-page">
            <div className="text-zone">
                <p>{number}</p>
                <StartTable number={number}/>
            </div>
        </div>
    )
}