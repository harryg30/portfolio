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

interface Data {
    DestinationsByMonth: DestinationsByMonth
}

const GET_TOP_DESTINATIONS: TypedDocumentNode<Data, Vars> = gql`
    query GetTopDestinations($limit: Int!) {
        DestinationsByMonth(order_by: { count: desc }, limit: $limit) {
            value: count
            target: endStationNumber
            source: startStationNumber
        }
    }
`
export default function YearCard(): JSX.Element {
    const { data } = useSuspenseQuery(GET_TOP_DESTINATIONS, {
        variables: { limit: 1 },
    })
    type nodeType = {
        name: string
        category: string
    }
    type scaleType = {}

    let nodes: nodeType[] = []
    let scale = {}
    const bar_data: { value: Int16Array; key: string; group: string } | any =
        data.DestinationsByMonth.map((row) => {
            nodes.push({ name: row.source, category: 'Start Station' })
            nodes.push({ name: row.target, category: 'End Station' })
            scale[row.source] = getRandomRainbowColor()
            scale[row.target] = getRandomRainbowColor()
        })
    console.log(data)
    console.log(nodes)
    console.log(scale)

    return (
        <>
            <Card title={'2023 Top trips'}>
                {bar_data === undefined || nodes === undefined ? (
                    <></>
                ) : (
                    <AlluvialChart
                        data={bar_data}
                        options={{
                            title: 'Alluvial (gradient)',
                            alluvial: {
                                nodes: nodes,
                            },
                            height: '600px',
                        }}
                    />
                )}
            </Card>
        </>
    )
}
function getRandomRainbowColor(): string {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}
