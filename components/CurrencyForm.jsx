import React, { useContext, useEffect } from 'react'

import { CurrencyContext } from '../CurrencyContext'
import { useCurrencyForm } from '../hooks/customHooks'


const CurrencyForm = () => {
    const { inputs, handleInputChange } = useCurrencyForm()
    const { exchange, input, result } = useContext(CurrencyContext)
    const [exchangeRates] = exchange
    const [_, setInputCurrency] = input
    const [resultCurrency, setResultCurrency] = result

    useEffect(() => {
        setInputCurrency(inputs.baseCurrency)
    }, [inputs])
    
    if(exchangeRates.rates === undefined) return <div>Loading...</div>
    if(exchangeRates.rates !== undefined) {

        const conversionRates = Object.values(exchangeRates.rates)[0]

        const convertCurrency = (event) => {
            const conversionResult = (event.target.value * conversionRates).toFixed(2)
            setResultCurrency(conversionResult)
        }
        
        const handleOnChange = (event) => {
            convertCurrency(event)
            handleInputChange(event)
        }

        return (
            <form>
                <label htmlFor="baseCurrency">
                    <input type="number" name="baseCurrency" placeholder="0" onChange={handleOnChange} />
                </label>
                
                <label htmlFor="convertedCurrency">
                    <input type="number" name="convertedCurrency" value={resultCurrency} readOnly/>
                </label>
            </form>
        )
    }

    
}

export default CurrencyForm