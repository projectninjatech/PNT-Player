import { BASE_IP } from "./config";

export const userloginAPI = async (username, password) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ // Include username and password in the request body
            username: username,
            password: password,
        }),
    };

    url = `${BASE_IP}/login`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("Login details", data)
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const checkAuthAPI = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    url = `${BASE_IP}/check-auth`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const userLogout = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    url = `${BASE_IP}/logout`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the userlogin api", error);
    }
};
