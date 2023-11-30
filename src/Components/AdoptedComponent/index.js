import React, {useState} from 'react';
import './index.css';
import {useEffect} from "react";
import * as animalClient from "../AnimalCard/client";
import AnimalCard from "../AnimalCard";
import {findAllPets} from "../AnimalCard/client";
import {useDispatch, useSelector} from "react-redux";
import {getByUsername} from "../Login/client";

const AdoptedComponent = () => {
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.userReducer);
    const [animals, setAnimals] = useState([]);


    const handleUnlike = (id) => {
        setAnimals(prevAnimals => prevAnimals.filter(animal => animal.props.animal._id !== id));
    };

    useEffect( () => {
        const fetchAnimals = async () => {
            // const user = await getByUsername(userReducer.username);
            // console.log(user)
            const allAnimals = await animalClient.findAllPets();
            setAnimals(allAnimals.filter(animal => animal.status === userReducer._id));
        }
        fetchAnimals();
    });

    return (
        <div>
            <div className="list-group d-flex flex-row flex-wrap">
                {/*{ animals.map((animal) => animal)}*/}
                {/*{adoptedPets.map(animal => <AnimalCard key={animal._id}*/}
                {/*                                       animal={animal}/>)}*/}
            </div>
        </div>
    );
};

export default AdoptedComponent;
