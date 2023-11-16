import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const LOGIN_URL = `${API_BASE}/user/login`;
const USERS_URL = `${API_BASE}/users`;

export const checkCredentials = async (username, password) => {
    const response = await axios.post(LOGIN_URL, {
        username,
        password,
    });
    return response.data;
}

export const getByUsername = async (username) => {
    const response = await axios.get(`${USERS_URL}/${username}`);
    return response.data;
}