import axios from "axios";
const request = axios.create({
                                 withCredentials: true,
                             });

export const BASE_API = "https://localhost:4000";
export const USER_API = `${BASE_API}/api/user`;

export const signup = async (credentials) => {
    const response = await request.post(
        `${USER_API}/register`, credentials);
    return response.data;
};
