import React, { useContext, useEffect, useState, useRef } from 'react'
import shortid from 'shortid'

import { useCurrencyForm } from '../hooks/customHooks'
import { CurrencyContext } from '../CurrencyContext'

const SelectCurrency = ({ currencies }) => {
    const { inputs, handleInputChange } = useCurrencyForm()
    
    const mounted = useRef(true)
    const [previousBaseCurrency, setPreviousBaseCurrency] = useState("")
    const [_, setPreviousResultCurrency] = useState("")
    
    const { exchange, result, input, baseCode, resultCode } = useContext(CurrencyContext)
    const [exchangeRates, setExchangeRates] = exchange
    const [__, setResultCurrency] = result
    const [inputCurrency] = input
    const [baseCurrencyCode, setBaseCurrencyCode] = baseCode
    const [resultCurrencyCode, setResultCurrencyCode] = resultCode

    useEffect(() => {
        loadRates()
    }, [])

    useEffect(() => {
        if (mounted.current) {
            mounted.current = false
        } else {
            if (previousBaseCurrency !== inputs.baseCurrencyCode) {
                loadRates()
            }

            if (inputs.baseCurrencyCode !== undefined) {
                setBaseCurrencyCode(inputs.baseCurrencyCode)
                setPreviousBaseCurrency(inputs.baseCurrencyCode)
            }
            

            if (inputs.resultCurrencyCode !== undefined) {
                setResultCurrencyCode(inputs.resultCurrencyCode)
                setPreviousResultCurrency(resultCurrencyCode)
            }

            if (exchangeRates.rates !== undefined) {
                const conversionRates = exchangeRates.rates[resultCurrencyCode]
                const conversionResult = (inputCurrency * conversionRates).toFixed(2)
                setResultCurrency(conversionResult)
            }
        }
    }, [inputs])

    
    const loadRates = async () => {
        let res = await fetch(`https://api.exchangeratesapi.io/latest?base=${inputs.baseCurrencyCode || baseCurrencyCode}`)
        const data = await res.json()
        setExchangeRates(data)
    }

    const currencyCodes = Object.keys(currencies.rates)
    currencyCodes.push(currencies.base)
    currencyCodes.sort()

    return (
        <form className="currency-selector">
            <select name='baseCurrencyCode' value={baseCurrencyCode} className="base-currency currency-select" onChange={handleInputChange}>
                {currencyCodes.map(code => {
                    return (
                        <option 
                            key={shortid.generate()} 
                            value={code}>
                                {code}
                        </option>
                    )
                })}
            </select>

            <select name='resultCurrencyCode' value={resultCurrencyCode} className="result-currency currency-select" onChange={handleInputChange}>
                {currencyCodes.map(code => {
                    return (
                        <option 
                            key={shortid.generate()} 
                            value={code}>
                                {code}
                        </option>
                    )
                })}
            </select>
        </form>
    )
}

export default SelectCurrency