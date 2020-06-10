import React from 'react'
import shortid from 'shortid'

import { useCurrencyForm } from '../hooks/customHooks'

export default function SelectCurrency({ currencies }) {
    const { inputs, handleInputChange } = useCurrencyForm()
    const currencyCodes = Object.keys(currencies.rates)
    currencyCodes.push(currencies.base)
    currencyCodes.sort()
    console.log(inputs)
    return (
        <form>
            <select name="currencyCodes" id="" onChange={handleInputChange}>
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
