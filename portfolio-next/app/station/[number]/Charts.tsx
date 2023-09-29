"use client";

import { useEffect, useState } from "react";
import checkEnvironment from "../../../components/checkEnv";
import { Ride, Station } from "../../../pages/api/db";
import DeparturesByDay from "./DeparturesByDay";

export default function Charts({ number }) {
  const [station, setStation] = useState({
    id: 999,
    number: "undefined",
    name: "undefined",
    latitude: 0,
    longitude: 0,
    district: "undefined",
    public: false,
    totalDocks: 0,
    deploymentYear: 0,
  } as Station);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetch(checkEnvironment().concat("/api/getStation?stationNo=", number), {
      method: "GET",
    })
      .then((resp) => resp.json())
      // .then(r => console.log(r))
      .then((data) => setStation(data.station));
  }, []);

  useEffect(() => {
    fetch(
      checkEnvironment().concat("/api/ridesFromStation?stationNo=", number),
      { method: "GET" }
    )
      .then((resp) => resp.json())
      .then((data) => setRides(data.rides));
  }, []);

  return (
    <div>
      <div className="text-zone">
        <p>{station.name}</p>
      </div>
      <div className="chart-zone">
        <DeparturesByDay
          data={cleanRides(rides)}
          destinations={destinationsByDay(rides)}
          bikes={getBikeData(rides)}
        />
      </div>
    </div>
  );
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

function getBikeData(rides: Ride[]): Map<number, number> {
    const bikeIdCountMap = new Map<number, number>();

    for (const ride of rides) {
        const { bikeId } = ride;

        if (bikeIdCountMap.has(bikeId)) {
            // Increment the count if the bikeId is already in the map
            bikeIdCountMap.set(bikeId, bikeIdCountMap.get(bikeId)! + 1);
        } else {
            // Initialize the count to 1 if the bikeId is not in the map
            bikeIdCountMap.set(bikeId, 1);
        }
    }

    return bikeIdCountMap;
}