import axios from "axios";

const request = axios.create({
                                 withCredentials: true,
                             });

const API_BASE = process.env.REACT_APP_API_BASE;
const COMMENTS_URL = `${API_BASE}/comments`;
const USER_URL = `${API_BASE}/user`;

export const findCommentsByPetId = async (petId) => {
    const response = await request.get(`${COMMENTS_URL}/pet/${petId}`);
    return response.data;
};

export const addComment = async (petId, comment) => {
    const response = await request.post(`${COMMENTS_URL}/pet/${petId}`, comment);
    return response.data;
};

export const deleteComment = async (commentId) => {
    const response = await request.delete(`${COMMENTS_URL}/pet/${commentId}`);
    console.log(response)
    return response.data;
};

export const getUserByUsername = async (username) => {
    try {
        const response = await request.get(`${USER_URL}/${username}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
};