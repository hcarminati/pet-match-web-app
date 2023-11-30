import React, { useState, useEffect } from 'react';
import './index.css';
import * as animalClient from '../AnimalCard/client';
import AnimalCard from '../AnimalCard';

const AdoptedComponent = ({ adoptedPets }) => {
    const [fetchedPetData, setFetchedPetData] = useState([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const newFetchedData = await Promise.all(
                    adoptedPets.map(async (adoptedPet) => {
                        const petData = await animalClient.findPetById(adoptedPet.petId);
                        return petData;
                    })
                );
                setFetchedPetData(newFetchedData);
            } catch (error) {
                console.error('Error fetching adopted pets:', error);
            }
        };

        fetchAnimals();
    }, [adoptedPets]);

    return (
        <div>
            <div className="list-group d-flex flex-row flex-wrap">
                {fetchedPetData.map((petData) => (
                    <AnimalCard key={petData._id} animal={petData} />
                ))}
            </div>
        </div>
    );
};

export default AdoptedComponent;
