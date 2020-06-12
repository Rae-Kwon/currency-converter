import React, { useContext, useState } from 'react'

import { useCurrencyForm } from '../hooks/customHooks'
import { CurrencyContext } from '../CurrencyContext'


const CurrencyForm = () => {
    const { inputs, handleSubmit, handleInputChange } = useCurrencyForm()
    const [exchangeRate] = useContext(CurrencyContext)
    const [resultCurrency, setResultCurrency] = useState(0)
    if(exchangeRate.rates === undefined) return <div>Loading...</div>
    if(exchangeRate.rates !== undefined) {
        const conversionRates = Object.values(exchangeRate.rates)[0]

        const convertCurrency = (event) => {
            const conversionResult = (event.target.value * conversionRates).toFixed(2)
            setResultCurrency(conversionResult)
        }
        console.log(inputs)

        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="baseCurrency">
                    <input type="number" name="baseCurrency" placeholder="Enter amount" onChange={convertCurrency} />
                </label>
                
                <label htmlFor="convertedCurrency">
                    <input type="number" name="convertedCurrency" value={resultCurrency} readOnly/>
                </label>
            </form>
        )
    }

    
}

export default CurrencyForm