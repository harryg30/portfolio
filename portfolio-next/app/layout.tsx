'use client'
import '../styles/globals.scss'
import Sidebar from '../components/Sidebar'
import { ApolloWrapper } from '../lib/apollo-wrapper'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <body>
                <div className="App">
                    <Sidebar />
                    <div className="page">
                        <main>
                            {' '}
                            <ApolloWrapper>{children}</ApolloWrapper>
                        </main>
                    </div>
                </div>
            </body>
        </html>
    )
}
