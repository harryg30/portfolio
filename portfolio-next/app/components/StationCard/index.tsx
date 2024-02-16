import { Station } from '../../../pages/api/db'
import { gql, TypedDocumentNode } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { DestinationsByMonth } from '../../../pages/api/db'

interface Vars {
    stationNumber: String
    limit: number
}

interface Data {
    DestinationsByMonth: DestinationsByMonth
}

const GET_DESTINATIONS_BY_STATION: TypedDocumentNode<Data, Vars> = gql`
    query GetDestinationsByStation($stationNumber: String!, $limit: Int!) {
        DestinationsByMonth(
            order_by: { count: desc }
            distinct_on: count
            limit: $limit
            where: { startStationNumber: { _eq: $stationNumber } }
        ) {
            count
            endStationNumber
            id
            month
            startStationNumber
            year
        }
    }
`

interface propTypes {
    station: Station
}

export default function StationCard(props: propTypes): JSX.Element {
    const number = props.station.number
    const { data } = useSuspenseQuery(GET_DESTINATIONS_BY_STATION, {
        variables: { stationNumber: number, limit: 100 },
    })

    return (
        <>
            <p>{data.DestinationsByMonth[0].count}</p>
        </>
    )
}
