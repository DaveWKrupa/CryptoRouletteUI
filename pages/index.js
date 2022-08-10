import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


import CryptoRouletteGame from '../components/CryptoRouletteGame'



export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Roulette</title>
        <meta name="description" content="Crypto Roulette" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <CryptoRouletteGame />
    </div>
  )
}
