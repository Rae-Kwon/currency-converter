import CurrencyForm from "../components/CurrencyForm"
import SelectCurrency from "../components/SelectCurrency"



const CurrencyConverter = ({ data }) => {
    return (
        <div className="converter-container">
            <div className="currency-converter">
                <CurrencyForm />
                <SelectCurrency currencies={data} />
            </div>
        </div>
    )
}

export default CurrencyConverter