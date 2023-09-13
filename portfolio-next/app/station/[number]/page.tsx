"use client";
import { useEffect, useState } from 'react';
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
    const [station, setStation] = useState({
        id: undefined,
        number: undefined,
        name: undefined,
        latitude: undefined,
        longitude: undefined,
        district: undefined,
        public: undefined,
        totalDocks: undefined,
        deploymentYear: undefined
    })

    useEffect(() => {
        fetch(checkEnvironment().concat('/api/getStation?stationNo=',number), { method: 'GET' })
            .then(resp => resp.json())
            .then(data => setStation(data.station))
    }, [])



        return (
        <div className="container station-page">
            <div className="text-zone">
                <p>{station.name}</p>
            </div>
            <div className='chart-zone'>
                <StartTable number={number}/>
            </div>
        </div>
    )
}