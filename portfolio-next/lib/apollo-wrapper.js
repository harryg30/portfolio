'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

function makeClient() {
    const key = process.env.HASURA_ACCESS_TOKEN
    const httpLink = new HttpLink({
        uri: 'https://honest-shark-99.hasura.app/v1/graphql',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-access-key': `${process.env.HASURA_ACCESS_TOKEN}`,
        },
    })

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      httpLink,
                  ])
                : httpLink,
    })
}

export function ApolloWrapper({ children }) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}
