import axios from "axios";

const request = axios.create({
                                 withCredentials: true,
                             });

const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_URL = `${API_BASE}/users`;
const USER_URL = `${API_BASE}/user`;
const PETS_URL = `${API_BASE}/pets`;
const ACENTERS_URL = `${API_BASE}/adoptionCenters`;

export const getUsers = async () => {
    const response = await request.get(`${USERS_URL}`);
    return response.data;
}

export const updateProfile = async (user, username) => {
    const response = await request.put(`${USER_URL}/${username}`, user);
    return response.data;
}

export const getUserById = async (userId) => {
    try {
        const response = await request.get(`${USERS_URL}/id/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
};

export const updateUserById = async (updatedUserData) => {
    try {
        const response = await request.put(`${USERS_URL}/id/${updatedUserData._id}`, updatedUserData);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating user by ID: ${error.message}`);
    }
};

export const getAvailablePets = async () => {
    const response = await request.get(`${PETS_URL}`);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await request.delete(`${USERS_URL}/id/${id}`);
}

// Adoption Centers Routes
export const findAllAdoptionCenters = async () => {
    const response = await request.get(`${ACENTERS_URL}`);
    return response.data;
};
export const addAdoptionCenter = async (aCenter) => {
    const response = await request.post(`${ACENTERS_URL}`, aCenter);
    return response.data;
};
export const deleteAdoptionCenter = async (id) => {
    const response = await request.delete(`${ACENTERS_URL}/${id}`);
    return response.data;
};
export const updateAdoptionCenterById = async (id, aCenter) => {
    const response = await request.put(`${ACENTERS_URL}/${id}`, aCenter);
    return response.data;
};
export const findAdoptionCenterById = async (id) => {
    const response = await request.get(`${ACENTERS_URL}/${id}`);
    return response.data;
};


