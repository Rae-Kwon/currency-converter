import Head from 'next/head'

import CurrencyForm from '../components/CurrencyForm'
import SelectCurrency from '../components/SelectCurrency'
import { CurrencyProvider } from '../CurrencyContext'

export const getStaticProps = async () => {
  const res = await fetch('https://api.exchangeratesapi.io/latest')
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  console.log(data)
  return (
    <CurrencyProvider>
      <div>
        <CurrencyForm />
        <SelectCurrency currencies={data} />
      </div>
    </CurrencyProvider>
  )
}
