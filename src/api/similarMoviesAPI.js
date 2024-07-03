import { BASE_IP } from "./config";

export const similarMoviesAPI = async (movieID) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    url = `${BASE_IP}/getSimilarMovies/${movieID}`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the similarsearch api", error);
    }
};