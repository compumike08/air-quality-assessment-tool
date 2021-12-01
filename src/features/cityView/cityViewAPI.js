import axios from 'axios';
import { AQ_BASE_URL } from "../../constants/urls";

export async function fetchLatestMeasurementsForCity(citySearchText) {
    const url = `${AQ_BASE_URL}/latest?limit=100&page=1&offset=0&city=${citySearchText}`;
    try {
        const response = await axios.get(url);
        return response.data.results;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
}
