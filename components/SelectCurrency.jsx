import React from 'react'
import shortid from 'shortid'

export default function SelectCurrency({ currencies }) {
    const currencyCodes = Object.keys(currencies.rates)
    currencyCodes.push(currencies.base)
    return (
        <form>
            <select name="currencyCodes" id="">
                {currencyCodes.map(code => {
                    return (
                        <option 
                            key={shortid.generate()} 
                            value={code} 
                            selected={currencies.base}>
                                {code}
                        </option>
                    )
                })}
            </select>
        </form>
    )
}
