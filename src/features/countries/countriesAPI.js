import axios from 'axios';
import { AQ_BASE_URL } from "../../constants/urls";

export async function fetchCountries() {
    const url = `${AQ_BASE_URL}/countries?sort=asc`;
    try {
        const response = await axios.get(url);
        return response.data.results;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
}
