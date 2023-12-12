import React, {useEffect, useState} from 'react';
import './index.css';
import AnimalCard from '../../AnimalCard';
import * as adminClient from "../../Admin/client";
import {useSelector} from "react-redux";

const UploadedPets = () => {
    const user = useSelector(state => state.userReducer);
    const [uploadedAnimals, setUploadedAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllAnimals = async () => {
            const animals = await adminClient.getAvailablePets();
            const allUploadedAnimals = animals.filter(animal => animal.uploader === user._id)
            setUploadedAnimals(allUploadedAnimals);
            setLoading(false);
        }

        getAllAnimals();

    }, []);

    const removeAnimal = (animalId) => {
        const updatedAnimals = uploadedAnimals.filter((animal) => animal._id !== animalId);
        setUploadedAnimals(updatedAnimals);
    };

    return (
        <div className="add-pets-container">
            <h2>Uploaded Pets</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                 <div className="list-group d-flex flex-row flex-wrap">
                     {uploadedAnimals.map((animal) => (
                         <AnimalCard key={animal.id} animal={animal} removeAnimal={removeAnimal}/>
                     ))}
                 </div>
             )}
        </div>
    );
};

export default UploadedPets;
