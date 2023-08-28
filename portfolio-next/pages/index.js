import Head from 'next/head';
import styles from '../styles/Home.module.css';
import App from './App'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <App/>
      </Head>
    </div>
  )
}
