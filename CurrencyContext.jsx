import React, { useState, useEffect, createContext } from 'react'

export const CurrencyContext = createContext()

export const CurrencyProvider = ({ children, baseCurrencyCode, resultCurrencyCode }) => {
    const [exchangeRates, setExchangeRates] = useState({})
    
    return (
        <CurrencyContext.Provider value={[exchangeRates, setExchangeRates]}>
            {children}
        </CurrencyContext.Provider>
    )
}