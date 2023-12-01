import axios from "axios";
const request = axios.create({
                                 withCredentials: true,
                             });

export const BASE_API = process.env.REACT_APP_API_BASE;
export const USER_API = `${BASE_API}/user`;

export const signup = async (credentials) => {
    console.log(`${USER_API}/register`)
    const response = await request.post(
        `${USER_API}/register`, credentials);
    return response.data;
};
