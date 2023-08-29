import '../styles/globals.scss'
import Head from 'next/head'
import {App} from './_app'
import {Layout} from '../app/Layout'
import React from 'react';

const Home = () => {
  return (
    <div className='App'>
      <Layout>
        <Head>
          <App />
        </Head>
      </Layout>
    </div>

  )
}

export default Home