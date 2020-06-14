import React, { useState, useContext, useEffect } from 'react'
import shortid from 'shortid'

import { useCurrencyForm } from '../hooks/customHooks'
import { CurrencyContext } from '../CurrencyContext'

export default function SelectCurrency({ currencies, conversionType }) {
    const { inputs, handleInputChange } = useCurrencyForm()
    const { exchange, result, input } = useContext(CurrencyContext)
    const [exchangeRates, setExchangeRates] = exchange
    const [resultCurrency, setResultCurrency] = result
    const [inputCurrency, setInputCurrency] = input

    useEffect(() => {
        if (inputs.baseCurrencyCode === undefined && inputs.resultCurrencyCode === undefined) {
            inputs.baseCurrencyCode = 'NZD'
            inputs.resultCurrencyCode = 'USD'
        }
    })
    
    useEffect(() => {
        loadRates()
    }, [inputs])

    const loadRates = async () => {
        let res = await fetch(`https://api.exchangeratesapi.io/latest?base=${inputs.baseCurrencyCode}&symbols=${inputs.resultCurrencyCode}`)
        const data = await res.json()
        setExchangeRates(data)
    }

    const currencyCodes = Object.keys(currencies.rates)
    currencyCodes.push(currencies.base)
    currencyCodes.sort()

    if (exchangeRates.rates === undefined) return <div>Loading...</div>

    if(exchangeRates.rates !== undefined) {

        const conversionRates = Object.values(exchangeRates.rates)[0]

        const convertCurrency = () => {
            const conversionResult = (inputCurrency * conversionRates).toFixed(2)
            setResultCurrency(conversionResult)
        }

        const handleOnChange = (event) => {
            handleInputChange(event)
            convertCurrency(event)
        }
        console.log(resultCurrency)
        return (
            <form>
                <select name='baseCurrencyCode' value={inputs.baseCurrencyCode} onChange={handleOnChange}>
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

                <select name='resultCurrencyCode' value={inputs.resultCurrencyCode} onChange={handleOnChange}>
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
}
