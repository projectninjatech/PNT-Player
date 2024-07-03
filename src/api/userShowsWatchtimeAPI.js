import { BASE_IP } from "./config";

export const updateShowsWatchtime = async (showID, watchedTime, episodeID) => {
    // Update the watchtime of a single movie in the user list
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ watchedTime, showID }),
    };

    url = `${BASE_IP}/update-shows-watched-time/${episodeID}`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the usershowwatchtime api", error);
    }
};

export const getLatestWatchedEpisodeID = async (showID) => {
    // GEt watchtime of a sinle movie in the user list
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    url = `${BASE_IP}/get-latest-watched-episodeID/${showID}`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const getShowWatchtime = async (episodeID) => {
    // GEt watchtime of a sinle movie in the user list
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    url = `${BASE_IP}/get-show-watchtime/${episodeID}`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const getAllShowsWatchtime = async () => {
    // GEt watchtime of a sinle movie in the user list
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    url = `${BASE_IP}/all-watched-shows`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const removeShowWatchtime = async (episodeID) => {
    // GEt watchtime of a sinle movie in the user list
    const options = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
        }
    };

    url = `${BASE_IP}/remove-watched-show/${episodeID}`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};