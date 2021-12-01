import axios from 'axios';
import { AQ_BASE_URL } from "../../constants/urls";

export async function fetchParameters() {
    const url = `${AQ_BASE_URL}/parameters`;
    try {
        const response = await axios.get(url);
        return response.data.results;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
}
