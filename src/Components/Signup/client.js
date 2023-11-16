import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const REGISTER_URL = `${API_BASE}/user/register`;

export const register = async (user) => {
    const response = await axios.post(REGISTER_URL, user);
    return response.data;
};
