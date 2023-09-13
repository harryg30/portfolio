import { useEffect, useState } from "react"
import checkEnvironment from "../../../components/checkEnv"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


function cleanRides(rides) {
    const dateCounts: { day: number; date: Date; count: number; }[] = []
    for (const r in rides) {
        const startTime = new Date(rides[r].startTime)
        const startDay =
            dateCounts.push({ day: startTime.getDay(), date: startTime, count: 1 })
    }

    const results = {}
    for (const row in dateCounts) {
        const day = dateCounts[row].day
        const date = dateCounts[row].date.toDateString()

        if (!results[day]) {
            results[day] = { count: 1, date: date }
        } else {
            results[day] = { count: results[day].count + 1, date: date }
        }
    }
    const ret: any[] = []
    for (const r in results) {
        ret.push(results[r])
    }


    return ret
}

export default function StartTable(props) {
    const [rides, setRides] = useState([])
    useEffect(() => {
        fetch(checkEnvironment().concat('/api/ridesFromStation?stationNo=', props.number), { method: 'GET' })
            .then(resp => resp.json())
            .then(data => setRides(data.rides))
    }, [])

    return (
        <div > 
            <p>Number of rides leaveing the station by date</p>
            <LineChart width={600} height={300} data={cleanRides(rides)}>
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
            </LineChart>
        </div>

    )
}