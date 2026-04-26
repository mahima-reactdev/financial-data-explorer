import axios from 'axios';
import { BASE_URL } from '../config/api';

export const fetchCompanyData = async (cik, type) => {
    try {
        const response = await axios.get(`${BASE_URL}/company/${cik}/${type}`)

        return response.data;
    } catch (error) {
        console.log(error)

    }
}