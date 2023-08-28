import Head from 'next/head';
import styles from '../styles/Home.module.css';
import App from './App'
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <Sidebar />
        <App/>
      </Head>
    </div>
  )
}
