import { BASE_IP } from "./config";

export const getAllShows = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    const url = `${BASE_IP}/getAllShows`
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the showlist api", error);
    }
};


export const getAllShowsGenres = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    const url = `${BASE_IP}/getAllShowsGenres`
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const getAllEpisodeList = async (episodeID) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    const url = `${BASE_IP}/episode-info/${episodeID}`
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};