import axios from "axios";
import {USER_API} from "../Profile/client";

const request = axios.create({
                                 withCredentials: true,
                             });

const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_URL = `${API_BASE}/users`;
const USER_URL = `${API_BASE}/user`;

export const signin = async (credentials) => {
    const response = await request.post(`${USER_URL}/login`, credentials);
    return response.data;
};

export const getByUsername = async (username) => {
    const response = await request.get(`${USERS_URL}/${username}`);
    return response.data;
}

export const account = async () => {
    const response = await request.post(`${USER_API}/account`);
    return response.data;
};
export const getAccount = async () => {
    const response = await request.get(`${USER_API}/account`);
    return response.data;
};