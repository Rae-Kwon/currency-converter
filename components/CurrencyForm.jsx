import React, { useContext, useEffect, useRef } from 'react'

import { CurrencyContext } from '../CurrencyContext'
import { useCurrencyForm } from '../hooks/customHooks'


const CurrencyForm = () => {
    const { inputs, handleInputChange, convertCurrency } = useCurrencyForm()
    const mount = useRef(true)

    const { exchange, input, result, resultCode } = useContext(CurrencyContext)
    const [exchangeRates] = exchange
    const [inputCurrency, setInputCurrency] = input
    const [resultCurrency] = result
    const [resultCurrencyCode] = resultCode

    useEffect(() => {
        console.log("UE")
        if (exchangeRates.rates !== undefined) {
            const conversionRates = exchangeRates.rates[resultCurrencyCode]
            convertCurrency(inputCurrency, conversionRates)
        }
    })

    useEffect(() => {
        if (mount.current) {
            mount.current = false
        } else {
            setInputCurrency(inputs.baseCurrency)
        }
    }, [inputs])
    
    if(exchangeRates.rates === undefined) return <div>Loading...</div>
    if(exchangeRates.rates !== undefined) {

        const conversionRates = exchangeRates.rates[resultCurrencyCode]

        // const convertCurrency = (event) => {
        //     const conversionResult = (event.target.value * conversionRates).toFixed(2)
        //     setResultCurrency(conversionResult)
        // }
        
        const handleOnChange = (event) => {
            convertCurrency(event.target.value, conversionRates)
            handleInputChange(event)
        }

        return (
            <form>
                <label htmlFor="baseCurrency">
                    <input type="number" name="baseCurrency" value={inputCurrency} onChange={handleOnChange} />
                </label>
                
                <label htmlFor="convertedCurrency">
                    <input type="number" name="convertedCurrency" value={resultCurrency} readOnly/>
                </label>
            </form>
        )
    }

    
}

export default CurrencyForm