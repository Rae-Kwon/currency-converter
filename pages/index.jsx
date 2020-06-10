import Head from 'next/head'

import CurrencyForm from '../components/CurrencyForm'

export const getStaticProps = async () => {
  const BASE_URL = fetch(`https://api.exchangeratesapi.io/latest`)

  const res = await BASE_URL
  const exchangeRates = await res.json()

  return {
    props: {
      exchangeRates
    }
  }
}

export default function Home({ exchangeRates }) {
  console.log(exchangeRates)
  return (
    <div>
      <CurrencyForm />
    </div>
  )
}
