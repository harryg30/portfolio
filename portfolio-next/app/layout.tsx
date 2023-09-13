"use client";
import '../styles/globals.scss'
import Sidebar from '../components/Sidebar'


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
            <main>{children}</main>
          </div>
        </div>
    </body>
    </html>
  )
}

