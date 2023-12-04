import React, {useEffect, useState} from 'react';
import './index.css';
import AnimalCard from '../../AnimalCard';
import {getAvailablePets} from "../client";

const AvailablePets = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAvailablePets()
            .then((data) => {
                setAnimals(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const removeAnimal = (animalId) => {
        const updatedAnimals = animals.filter((animal) => animal._id !== animalId);
        setAnimals(updatedAnimals);
    };

    return (
        <div className="add-pets-container">
            <h2>Available Pets</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                 <div className="list-group d-flex flex-row flex-wrap">
                     {animals.map((animal) => (
                         <AnimalCard key={animal.id} animal={animal} removeAnimal={removeAnimal}/>
                     ))}
                 </div>
             )}
        </div>
    );
};

export default AvailablePets;
