import Layout from '../app/layout'
import '../styles/globals.scss'
import React from 'react';
import "leaflet/dist/leaflet.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>

  )
}