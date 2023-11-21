import axios from "axios";

const request = axios.create({
                                 withCredentials: true,
                             });

const API_BASE = process.env.REACT_APP_API_BASE;
const PETS_URL = `${API_BASE}/pets`;

export const addPet = async (pet) => {
    const response = await request.post(`${PETS_URL}`, pet);
    return response.data;
};

export const deletePet = async (pet) => {
    const response = await request.delete(`${PETS_URL}/${pet._id}`);
    return response.data;
};

export const findPetByOriginalId = async (id) => {
    const response = await request.get(`${PETS_URL}/original/${id}`);
    return response.data;
};