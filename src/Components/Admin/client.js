import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_URL = `${API_BASE}/users`;
const USER_URL = `${API_BASE}/user`;

export const getUsers = async () => {
    const response = await axios.get(`${USERS_URL}`);
    return response.data;
}

export const updateProfile = async (user, username) => {
    const response = await axios.put(`${USER_URL}/${username}`, user);
    return response.data;
}

export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${USERS_URL}/id/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
};

export const updateUserById = async (userId, updatedUserData) => {
    try {
        const response = await axios.put(`${USERS_URL}/id/${userId}`, updatedUserData);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating user by ID: ${error.message}`);
    }
};
