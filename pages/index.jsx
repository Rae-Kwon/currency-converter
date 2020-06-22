import Head from 'next/head'

import { CurrencyProvider } from '../CurrencyContext'
import CurrencyConverter from '../components/CurrencyConverter'

export const getStaticProps = async () => {
  const res = await fetch("https://api.exchangeratesapi.io/latest")
  const data = await res.json()
  return {
      props: {
          data,
      },
  }
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css"/>
      </Head>
      <CurrencyProvider>
        <CurrencyConverter data={data} />
      </CurrencyProvider>
    </>
  )
}
