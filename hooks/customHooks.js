import { useState, useContext } from 'react'

import { CurrencyContext } from '../CurrencyContext'

export const useCurrencyForm = () => {
    const [inputs, setInputs] = useState({})
    const { result } = useContext(CurrencyContext)
    const [_, setResultCurrency] = result

    const handleInputChange = (event) => {
        event.persist()
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
    }

    const convertCurrency = (inputCurrency, conversionRates) => {
        const conversionResult = (inputCurrency * conversionRates).toFixed(2)
        setResultCurrency(conversionResult)
    }

    return {
        handleInputChange,
        convertCurrency,
        inputs,
    }
}