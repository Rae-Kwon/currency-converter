import CurrencyForm from "../components/CurrencyForm"
import SelectCurrency from "../components/SelectCurrency"



const CurrencyConverter = ({ data }) => {
    return (
        <div className="converter-container">
            <CurrencyForm />
            <SelectCurrency currencies={data} />
        </div>
    )
}

export default CurrencyConverter