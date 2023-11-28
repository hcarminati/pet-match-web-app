import axios from "axios";
import {USER_API} from "../client";

const request = axios.create({
                                 withCredentials: true,
                             });

const API_BASE = process.env.REACT_APP_API_BASE;
const USER_URL = `${API_BASE}/user`;
const USERS_URL = `${API_BASE}/users`;

export const updateProfile = async (user) => {
    const response = await request.put(`${USERS_URL}/id/${user._id}`, user);
    return response.data;
}
export const account = async () => {
    const response = await request.post(`${USER_API}/account`);
    return response.data;
};
export const getByUsername = async (username) => {
    const response = await request.get(`${USERS_URL}/${username}`);
    return response.data;
}
