import axios from "axios";

const request = axios.create({
                                 withCredentials: true,
                             });

const API_BASE = process.env.REACT_APP_API_BASE;
const PETS_URL = `${API_BASE}/pets`;
const LIKES_URL = `${API_BASE}/likes`;

export const addPet = async (pet) => {
    const response = await request.post(`${PETS_URL}`, pet);
    return response.data;
};

export const deletePet = async (pet) => {
    const response = await request.delete(`${PETS_URL}/${pet._id}`);
    return response.data;
};

export const findPetById = async (id) => {
    const response = await request.get(`${PETS_URL}/id/${id}`);
    return response.data;
};

export const findPetByOriginalId = async (id) => {
    const response = await request.get(`${PETS_URL}/original/${id}`);
    return response.data;
};

export const addLike = async (likeObj) => {
    const response = await request.post(`${LIKES_URL}/pet/${likeObj.petId}`, likeObj);
    return response.data;
};

export const getLikedPets = async () => {
    const response = await request.get(`${LIKES_URL}`);
    return response.data;
};

export const findAllPets = async () => {
    const response = await request.get(`${PETS_URL}`);
    return response.data;
}

export const deleteLike = async (likeId) => {
    const response = await request.delete(`${LIKES_URL}/${likeId}`);
    return response.data;
};

export const getUserLikes = async (userId) => {
    const response = await request.get(`${LIKES_URL}/user/${userId}`);
    return response.data;
}