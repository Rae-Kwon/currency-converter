import React, { useState } from 'react'

const useCurrencyForm = () => {
    const [inputs, setInputs] = useState({})
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("submitted")
    }

    const handleInputChange = (event) => {
        console.log(event.target.value)
        event.persist()
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs
    }
}

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