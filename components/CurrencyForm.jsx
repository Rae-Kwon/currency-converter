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
        
        const handleOnChange = (event) => {
            convertCurrency(event.target.value, conversionRates)
            handleInputChange(event)
        }

        return (
            <div className="currency-input">
                <form>
                <div className="base-currency">
                    <label htmlFor="baseCurrency">
                        <input type="number" name="baseCurrency" value={inputCurrency} onChange={handleOnChange} />
                    </label>
                </div>
                
                <div className="result-currency">
                    <label htmlFor="convertedCurrency">
                        <input type="number" name="convertedCurrency" value={resultCurrency} readOnly/>
                    </label>
                </div>
            </form>
            </div>
        )
    }

    
}

export default CurrencyForm