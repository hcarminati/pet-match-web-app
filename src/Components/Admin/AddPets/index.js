import React, { useState, useEffect } from 'react';
import './index.css';
import { getAnimals } from '../../../api/petfinder-api';
import AnimalCard from '../../AnimalCard';
import {getAvailablePets} from "../client";

const AddPets = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dbAnimals, setDbAnimals] = useState([]);

    useEffect(() => {
        Promise.all([getAnimals(), getAvailablePets()])
            .then(([petfinderAnimals, databaseAnimals]) => {
                setAnimals(petfinderAnimals.animals);
                setDbAnimals(databaseAnimals);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const isInDatabase = (animal) => {
        return dbAnimals.some((dbAnimal) => dbAnimal.originalId === animal.id);
    };

    return (
        <div className="add-pets-container">
            <h2>Add Pets</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                 <div className="list-group d-flex flex-row flex-wrap">
                     {animals
                         .filter((animal) => isInDatabase(animal)) // Filter out animals already in the database
                         .map((animal) => (
                             <AnimalCard key={animal.id} animal={animal} add={true} />
                         ))}
                 </div>
             )}
        </div>
    );
};

export default AddPets;
