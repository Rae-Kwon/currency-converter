import React, { useState, useEffect, createContext } from 'react'

export const CurrencyContext = createContext()

export const CurrencyProvider = ({ children }) => {
    const [exchangeRates, setExchangeRates] = useState({})
    const [resultCurrency, setResultCurrency] = useState(0)
    const [inputCurrency, setInputCurrency] = useState(1)
    const [baseCurrencyCode, setBaseCurrencyCode] = useState("NZD")
    const [resultCurrencyCode, setResultCurrencyCode] = useState("USD")

    return (
        <CurrencyContext.Provider value={
                {
                    exchange: [exchangeRates, setExchangeRates], 
                    result: [resultCurrency, setResultCurrency], 
                    input: [inputCurrency, setInputCurrency],
                    baseCode: [baseCurrencyCode, setBaseCurrencyCode],
                    resultCode: [resultCurrencyCode, setResultCurrencyCode]
                }
            }>
            {children}
        </CurrencyContext.Provider>
    )
}