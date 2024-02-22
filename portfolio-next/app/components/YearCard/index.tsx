import { Station } from '../../../pages/api/db'
import { gql, TypedDocumentNode } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { DestinationsByMonth } from '../../../pages/api/db'
import { Card } from 'antd'
import { AlluvialChart, ScaleTypes } from '@carbon/charts-react'
import '@carbon/charts-react/styles.css'

interface Vars {
    limit: number
}

type destinations_by_station_pairs_view = {
    [x: string]: any
    total_count: Number
    endStationNumber: string
    startStationNumber: string
}

interface Data {
    destinations_by_station_pairs_view: destinations_by_station_pairs_view
}

const GET_TOP_DESTINATIONS: TypedDocumentNode<Data, Vars> = gql`
    query GetTopDestinations($limit: Int!) {
        destinations_by_station_pairs_view(
            order_by: { total_count: desc }
            limit: $limit
        ) {
            value: total_count
            target: end_station_name
            source: start_station_name
        }
    }
`
export default function YearCard(): JSX.Element {
    const { data } = useSuspenseQuery(GET_TOP_DESTINATIONS, {
        variables: { limit: 15 }
    })
    type nodeType = {
        name: string
        category: string
    }

    let nodes: nodeType[] = []
    const bar_data: { value: Int16Array; key: string; group: string } | any =
        data.destinations_by_station_pairs_view.map((row) => {
            nodes.push({ name: row.source, category: 'Start Station' })
            nodes.push({ name: row.target + ' ', category: 'End Station' })
            return {
                value: row.value,
                source: row.source,
                target: row.target + ' '
            }
        })

    function onlyUnique(value, index, self) {
        return self.findIndex((obj) => obj.name === value.name) === index
    }

    return (
        <>
            <Card title={'2023 Blue Bike Stats'}>
                {bar_data === undefined || nodes === undefined ? (
                    <></>
                ) : (
                    <AlluvialChart
                        data={bar_data}
                        options={{
                            title: 'Top ten trips (trip: unique start, end stations)',
                            alluvial: {
                                nodes: nodes.filter(onlyUnique)
                            },
                            height: '500px'
                        }}
                    />
                )}
            </Card>
        </>
    )
}
