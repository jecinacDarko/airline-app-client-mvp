import { baseUrl } from "../config";

const getCities = async (): Promise<string[]> => {
    return await (await fetch(`${baseUrl}cities`)).json();
}

export default { getCities }