import Layout from '../app/Layout'
import '../styles/globals.scss'
import React from 'react';
// import "leaflet/dist/leaflet.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>

  )
}