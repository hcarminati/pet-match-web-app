import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const USER_URL = `${API_BASE}/user`;

export const updateProfile = async (user, username) => {
    const response = await axios.put(`${USER_URL}/${username}`, user);
    return response.data;
}
