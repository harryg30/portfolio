"use client";
import { useEffect, useState } from 'react';
import checkEnvironment from '../../../components/checkEnv';
import StartTable from './StartTable';
import DeparturesByDay from './DeparturesByDay';

import { Ride, Station } from '../../../pages/api/db'

export async function generateStaticParams() {
    const stations = await fetch(checkEnvironment().concat('/api/getStations'), { method: 'GET' }).then((res) => res.json())
    return Array.from(stations).map((station: Station) => ({
        number: station.number
    }))
}

export default function Page({ params }) {
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
        fetch(checkEnvironment().concat('/api/getStation?stationNo=', number), { method: 'GET' })
            .then(resp => resp.json())
            .then(data => setStation(data.station))
    }, [])

    useEffect(() => {
        fetch(checkEnvironment().concat('/api/ridesFromStation?stationNo=', number), { method: 'GET' })
            .then(resp => resp.json())
            .then(data => setRides(data.rides))
    }, [])

    return (
        <div className="container station-page">
            <div className="text-zone">
                <p>{station.name}</p>
            </div>
            <div className='chart-zone'>
                <DeparturesByDay data={cleanRides(rides)} destinations={destinationsByDay(rides)} />
            </div>
        </div>
    )
}

function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function destinationsByDay(rides) {
    const groupedData = rides.reduce((result, ride) => {
        const startDate = new Date(ride.startTime);
        startDate.setHours(0, 0, 0, 0);
        const endingStation = ride.endingStation[0].station;
        const formattedDate = formatDate(startDate);

        if (!result.has(formattedDate)) {
            result.set(formattedDate, new Map());
        }

        const dateMap = result.get(formattedDate) || new Map();

        if (!dateMap.has(endingStation.number)) {
            dateMap.set(endingStation.number, 1);
        } else {
            dateMap.set(endingStation.number, dateMap.get(endingStation.number) + 1);
        }

        return result;
    }, new Map());

    return groupedData;
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
        const date = dateCounts[row].date.toLocaleDateString()

        if (!results[day]) {
            results[day] = { date: new Date(date), count: 1 }
        } else {
            results[day] = { date: new Date(date), count: results[day].count + 1 }
        }
    }
    const ret: any[] = []
    for (const r in results) {
        ret.push(results[r])
    }


    return ret
}