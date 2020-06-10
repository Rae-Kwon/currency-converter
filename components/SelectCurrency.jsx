import React, { useState } from 'react'
import shortid from 'shortid'

import { useCurrencyForm } from '../hooks/customHooks'

const selectConversionType = (type) => {
    return type === "base" ? "baseCurrencyCode" : "resultCurrencyCode"
}

export default function SelectCurrency({ currencies, conversionType }) {
    const { inputs, handleInputChange } = useCurrencyForm()
    const [activeCode, setActiveCode] = useState('')

    const currencyCodes = Object.keys(currencies.rates)
    currencyCodes.push(currencies.base)
    currencyCodes.sort()
    console.log(inputs)
    return (
        <form>
            <select name={selectConversionType(conversionType)} value={inputs.baseCurrencyCode || inputs.resultCurrencyCode} onChange={handleInputChange}>
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
