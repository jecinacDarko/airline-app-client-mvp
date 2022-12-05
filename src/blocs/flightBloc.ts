import { baseUrl } from "../config";
import { SearchDTO } from "../models/SearchDTO";
import { SearchResponse } from "../models/SearchResponse";

const searchFlights = async (searchDTO: SearchDTO): Promise<SearchResponse> => {
    const res = await fetch(`${baseUrl}flights/search`, {
        method: 'post',
        body: JSON.stringify(searchDTO),
        headers: { 'Content-Type': 'application/json'}
    });
    return res.json();
}

export default { searchFlights };