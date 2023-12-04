import React, {useEffect, useState} from 'react';
import './index.css';
import * as animalClient from "../AnimalCard/client";
import AnimalCard from "../AnimalCard";

const LikesComponent = ({likes}) => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            const animalData = await Promise.all(
                likes.map(async (like) => {

                    const allPets = await animalClient.findAllPets();
                    const animal = allPets.find(pet => pet._id === like.petId)
                    if (animal) {
                        return (<AnimalCard key={animal._id}
                                            animal={animal}
                                            onUnlike={() => handleUnlike(like.petId)}/>);
                    }

                })
            );
            setAnimals(animalData);
        };

        fetchAnimals();
    }, [likes]);

    const handleUnlike = (id) => {
        setAnimals(prevAnimals => prevAnimals.filter(animal => animal.props.animal._id !== id));
    };

    return (
        <div>
            <div className="list-group d-flex flex-row flex-wrap">
                {animals.map((animal) => animal)}
            </div>
        </div>
    );
};

export default LikesComponent;
