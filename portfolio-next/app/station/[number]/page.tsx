"use client";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";
import checkEnvironment from '../../../components/checkEnv';

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
        number: station.number,
    }))
}

export default function Page({params}) {
    const { number } = params
    const [rides, setRides] = useState([])
    useEffect(() => {
        fetch(checkEnvironment().concat('/api/ridesFromStation?stationNo=',number), { method: 'GET' })
          .then(resp => resp.json())
          .then(data => setRides(data.rides))
      }, [])

      console.log(rides)
    return (
        <div className="container station-page">
            <div className="text-zone">
                <p>{number}</p>
            </div>
        </div>
    )
}