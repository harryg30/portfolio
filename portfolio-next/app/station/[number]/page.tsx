"use client";
import { useEffect, useState } from 'react';
import checkEnvironment from '../../../components/checkEnv';
import StartTable from './StartTable';
import DeparturesByDay from './DeparturesByDay';

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
    const [rides, setRides] = useState([])
    
    useEffect(() => {
        fetch(checkEnvironment().concat('/api/getStation?stationNo=',number), { method: 'GET' })
            .then(resp => resp.json())
            .then(data => setStation(data.station))
    }, [])

    useEffect(() => {
        fetch(checkEnvironment().concat('/api/ridesFromStation?stationNo=',number), { method: 'GET' })
            .then(resp => resp.json())
            .then(data => setRides(data.rides))
    }, [])

        return (
        <div className="container station-page">
            <div className="text-zone">
                <p>{station.name}</p>
            </div>
            <div className='chart-zone'>
            <p>Number of rides leaving the station by date</p>
                <DeparturesByDay data={cleanRides(rides)}/>
            </div>
        </div>
    )
}


function cleanRides(rides) {
    const dateCounts: { day: number; date: Date; count: number; }[] = []
    for (const r in rides) {
        const startTime = new Date(rides[r].startTime)
            dateCounts.push({ day: startTime.getDay(), date: startTime, count: 1 })
    }

    const results = {}
    for (const row in dateCounts) {
        const day = dateCounts[row].day
        const date = dateCounts[row].date.toDateString()

        if (!results[day]) {
            results[day] = { date: date, count: 1 }
        } else {
            results[day] = { date: date, count: results[day].count + 1 }
        }
    }
    const ret: any[] = []
    for (const r in results) {
        ret.push(results[r])
    }


    return ret
}