import { useEffect, useState } from "react"
import checkEnvironment from "../../../components/checkEnv"


export default function StartTable(props){
    const [rides, setRides] = useState([])
    useEffect(() => {
        fetch(checkEnvironment().concat('/api/ridesFromStation?stationNo=',props.number), { method: 'GET' })
          .then(resp => resp.json())
          .then(data => setRides(data.rides))
      }, [])

      console.log(rides)
      return(
        <>
        </>
      )
}