import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import {useSelector} from "react-redux";
import * as client from "./client";

function AnimalCard({animal, add, removeAnimal}) {
    const role = useSelector((state) => state.userReducer.role);
    const [isLiked, setIsLiked] = useState(false);
    const toggleLike = () => {
        if (isLoggedIn) {
            setIsLiked(!isLiked);
        }
    };

    console.log(animal)

    const addPet = async () => {
        const newAnimal = {
            originalId: animal.id,
            name: animal.name,
            age: animal.age,
            attributes: animal.attributes,
            breeds: animal.breeds,
            coat: animal.coat,
            gender: animal.gender,
            size: animal.size,
            colors: animal.colors,
            description: animal.description,
            status: animal.status,
            primary_photo_cropped: animal.primary_photo_cropped,
            photos: animal.photos,
            published_at: animal.published_at,
            tags: animal.tags,
            type: animal.type,
        }

        await client.addPet(newAnimal);
        setIsLiked(!isLiked);
    }

    const deletePet = async () => {
        if (removeAnimal) {
            removeAnimal(animal._id);
        }
        await client.deletePet(animal);
    }

    const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

    return (
        <div className={"card my-3 mx-3"}>
            <div className="card-img-top">
                <img
                    src={animal.primary_photo_cropped ? animal.primary_photo_cropped.full : ""}
                    alt="Animal Image"
                    className="fill-image"
                />
            </div>

            {isLoggedIn ? <div className="vertical-dots">
                {add ? <FontAwesomeIcon
                         className={`${isLiked ? 'text-danger' : 'text-white'}`}
                         icon={faPlus}
                         onClick={addPet}
                     />
                : <FontAwesomeIcon
                     className={`${isLiked ? 'text-danger' : 'text-white'}`}
                     icon={faHeart}
                     onClick={toggleLike}
                 />}
                {add ? <></>
                     : <FontAwesomeIcon
                     className='text-white ms-1'
                     icon={faTrash}
                     onClick={deletePet}
                 />}
            </div> : <></>}
            <Link
                to={`/Pet/${animal._id ? animal.originalId  :animal.id}`}
                className="text-decoration-none text-reset"
            >
                <div className="card-body m-0">
                    <h6 className="card-title">{animal.name}</h6>
                    <p className="card-text text-muted">{animal.breeds.primary}</p>
                </div>
            </Link>
        </div>
    );
}

export default AnimalCard;
