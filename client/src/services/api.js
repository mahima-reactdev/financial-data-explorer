import axios from 'axios';

export const fetchCompanyData = async (cik, type) => {
    try {
        const response = await axios.get(`http://localhost:8080/company/${cik}/${type}`)

        return response.data;
    } catch (error) {
        console.log(error)

    }
}