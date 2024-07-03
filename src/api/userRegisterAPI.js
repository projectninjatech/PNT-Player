import { BASE_IP } from "./config";

export const userRegisterAPI = async (username, password) => {
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

    url = `${BASE_IP}/register`

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("Register", data)
        return data
    } catch (error) {
        console.error("Error fetching the userregister api", error);
    }
};