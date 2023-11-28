import axios from "axios";

const request = axios.create({
                                 withCredentials: true,
                             });

export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/users`;
export const USER_API = `${BASE_API}/user`;
export const COMMENTS_API = `${BASE_API}/comments`;
export const LIKES_API = `${BASE_API}/likes`;

export const account = async () => {
    const response = await request.post(`${USER_API}/account`);
    return response.data;
};
export const getAccount = async () => {
    const response = await request.get(`${USER_API}/account`);
    return response.data;
};

export const findUserById = async (id) => {
    const response = await request.get(`${USERS_API}/id/${id}`);
    return response.data;
};


export const signup = async (credentials) => {
    const response = await request.post(
        `${USER_API}/register`, credentials);
    return response.data;
};

export const findCommentsByUserId = async (userId) => {
    const response = await request.get(`${COMMENTS_API}/user/${userId}`);
    return response.data;
};

export const findLikesByUserId = async (userId) => {
    const response = await request.get(`${LIKES_API}/user/${userId}`);
    return response.data;
};

export const getUserByUsername = async (username) => {
    try {
        const response = await request.get(`${USERS_API}/${username}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
};

export const findAllUsers = async () => {
    const response = await request.get(`${USERS_API}`);
    return response.data;
}