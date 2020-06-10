import React from 'react'

import { useCurrencyForm } from '../hooks/customHooks'


const CurrencyForm = () => {
    const { inputs, handleSubmit, handleInputChange } = useCurrencyForm()
    console.log(inputs)
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="baseCurrency">
                <input type="number" name="baseCurrency" id="" onChange={handleInputChange}/>
            </label>
            
            <label htmlFor="convertedCurrency">
                <input type="number" name="convertedCurrency" id="" onChange={handleInputChange}/>
            </label>
            <input type="submit" value="Convert"/>
        </form>
    )
}

export default CurrencyForm