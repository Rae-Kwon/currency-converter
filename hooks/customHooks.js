import { useState } from 'react'

export const useCurrencyForm = () => {
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