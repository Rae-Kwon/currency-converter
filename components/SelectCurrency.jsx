import React, { useState, useContext, useEffect } from 'react'
import shortid from 'shortid'

import { useCurrencyForm } from '../hooks/customHooks'
import { CurrencyContext } from '../CurrencyContext'

export default function SelectCurrency({ currencies, conversionType }) {
    const { inputs, handleInputChange } = useCurrencyForm()
    const [exchangeRates, setExchangeRates] = useContext(CurrencyContext)

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

    return (
        <form>
            <select name='baseCurrencyCode' value={inputs.baseCurrencyCode} onChange={handleInputChange}>
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

            <select name='resultCurrencyCode' value={inputs.resultCurrencyCode} onChange={handleInputChange}>
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
