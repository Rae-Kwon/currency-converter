import Head from 'next/head'

import CurrencyForm from '../components/CurrencyForm'
import SelectCurrency from '../components/SelectCurrency'

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
      <SelectCurrency currencies={exchangeRates} conversionType="base"/>
      <SelectCurrency currencies={exchangeRates} conversionType="result" />
    </div>
  )
}
