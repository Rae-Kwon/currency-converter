const BASE_URL = fetch(`https://api.exchangeratesapi.io/latest`)

export default async (req, res) => {
    const data = await res.json()
    return data
}