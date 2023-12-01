// Replace with your actual Petfinder API credentials
import * as client from "../Components/AnimalCard/client";

const clientId = 'kbEjL4iJRDrshuPiCJR1zsRuwZ5YKnpxsXCzGIo9MSTREPvx1s';
const clientSecret = 'd57cKyVgUhB7QUXFPiGi3J3284PYz24Y229PLzMp';

// Function to get an access token from Petfinder
async function getAccessToken() {
    const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });

    if (!response.ok) {
        throw new Error('Failed to obtain access token');
    }

    const tokenData = await response.json();
    return tokenData.access_token;
}

// Function to fetch a list of animals
export async function getAnimals() {
    const accessToken = await getAccessToken();
    const apiUrl = 'https://api.petfinder.com/v2/animals';

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch animals');
    }

    const animalData = await response.json();

    // Filter out animals without photos
    const animalsWithPhotos = animalData.animals.filter(animal => animal.primary_photo_cropped);

    return { ...animalData, animals: animalsWithPhotos };
}

export async function getAnimalById(animalId) {
    const accessToken = await getAccessToken();
    const apiUrl = `https://api.petfinder.com/v2/animals/${animalId}`;

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch the animal by ID');
    }

    const animalData = await response.json();

    const animal = await client.findPetByOriginalId(animalId);

    return {
        ...animalData.animal,
        // status: animal.status,
    }; // Return the individual animal data
}

export async function searchAnimals(query) {
    const accessToken = await getAccessToken();
    const apiUrl = 'https://api.petfinder.com/v2/animals';

    const queryParams = new URLSearchParams(query);

    const response = await fetch(`${apiUrl}?${queryParams}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch animals');
    }

    const animalData = await response.json();

    // Filter out animals without photos
    const animalsWithPhotos = animalData.animals.filter(animal => animal.primary_photo_cropped);

    return { ...animalData, animals: animalsWithPhotos };
}

