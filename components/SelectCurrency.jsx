import React, { useContext, useEffect, useState, useRef } from 'react'
import shortid from 'shortid'

import { useCurrencyForm } from '../hooks/customHooks'
import { CurrencyContext } from '../CurrencyContext'

export default function SelectCurrency({ currencies }) {
    const { inputs, handleInputChange } = useCurrencyForm()
    const { exchange, result, input, baseCode, resultCode } = useContext(CurrencyContext)
    const [previousBaseCurrency, setPreviousBaseCurrency] = useState("")
    const [previousResultCurrency, setPreviousResultCurrency] = useState("")
    const mounted = useRef(true)
    const [exchangeRates, setExchangeRates] = exchange
    const [resultCurrency, setResultCurrency] = result
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
            console.log("start cdm")
            console.log("Prev", baseCurrencyCode, inputs.baseCurrencyCode)
            if (previousBaseCurrency !== inputs.baseCurrencyCode) {
                console.log("loadRate")
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
                console.log("inside")
                const conversionRates = exchangeRates.rates[resultCurrencyCode]
                const conversionResult = (inputCurrency * conversionRates).toFixed(2)
                setResultCurrency(conversionResult)
            }
            console.log("PRC", previousBaseCurrency)
            console.log("end cdm")
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

    const handleBaseOnChange = (event) => {
        handleInputChange(event)
    }

    const handleResultOnChange = (event) => {
        handleInputChange(event)
    }

    return (
        <form>
            <select name='baseCurrencyCode' value={baseCurrencyCode} onChange={handleBaseOnChange}>
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

            <select name='resultCurrencyCode' value={resultCurrencyCode} onChange={handleResultOnChange}>
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
