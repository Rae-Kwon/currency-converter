import { useState } from 'react'

export const useCurrencyForm = () => {
    const [inputs, setInputs] = useState({})

    const handleInputChange = (event) => {
        event.persist()
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
    }

    return {
        handleInputChange,
        inputs,
    }
}