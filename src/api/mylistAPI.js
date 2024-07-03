import { BASE_IP } from "./config";

export const mylistAPI = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    url = `${BASE_IP}/mylist`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const addMovieToList = async (movieID) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    url = `${BASE_IP}/add-to-mylist/${movieID}`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("The data",data)
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const removeMovieFromList = async (movieID) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    url = `${BASE_IP}/remove-from-mylist/${movieID}`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("The data",data)
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};


export const showsMyList = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    url = `${BASE_IP}/showsMylist`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log("The data",data)
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const addShowsToMylist = async (showID) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    url = `${BASE_IP}/add-show-to-mylist/${showID}`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("The data",data)
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const removeShowFromMylist = async (showID) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    url = `${BASE_IP}/remove-show-from-mylist/${showID}`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("The data",data)
        return data
    } catch (error) {
        console.error("Error fetching the mylist api", error);
    }
};