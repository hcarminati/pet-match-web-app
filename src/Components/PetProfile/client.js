import axios from "axios";

const request = axios.create({
                                 withCredentials: true,
                             });

const API_BASE = process.env.REACT_APP_API_BASE;
const COMMENTS_URL = `${API_BASE}/comments`;
const USER_URL = `${API_BASE}/user`;
const PETS_URL = `${API_BASE}/pets`;
const ADOPTEDPETS_URL = `${API_BASE}/adoptedPets`;
const MEDRECS_URL = `${API_BASE}/medicalRecords`;

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

export const updatePetById = async (updatedPetData) => {
    try {
        const response = await request.put(`${PETS_URL}/${updatedPetData._id}`, updatedPetData);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching pet by ID: ${error.message}`);
    }
};

export const addAdoptedPet = async (petId, adoptedPet) => {
    const response = await request.post(`${ADOPTEDPETS_URL}/pet/${petId}`, adoptedPet);
    return response.data;
};

export const getAllAdoptedPets = async () => {
    const response = await request.get(`${ADOPTEDPETS_URL}`);
    return response.data;
};

// Medical Records

export const findAllMedicalRecords = async () => {
    const response = await request.get(`${MEDRECS_URL}`);
    console.log(`${MEDRECS_URL}`)
    return response.data;
};
export const findMedicalRecordById = async (id) => {
    const response = await request.get(`${MEDRECS_URL}/id/${id}`);
    return response.data;
};
export const addMedicalRecord = async (newMedicalRecord) => {
    const response = await request.post(`${MEDRECS_URL}`, newMedicalRecord);
    return response.data;
};
export const deleteMedicalRecord = async (id) => {
    const response = await request.delete(`${MEDRECS_URL}/${id}`);
    return response.data;
};
export const updateMedicalRecordById = async (newMedicalRecord) => {
    const response = await request.put(`${MEDRECS_URL}/${newMedicalRecord._id}`, newMedicalRecord);
    return response.data;
};
