import { BASE_IP } from "./config";

export const showsSearchAPI = async (showName) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    url = `${BASE_IP}/searchShows/${showName}`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the showsearch api", error);
    }
};