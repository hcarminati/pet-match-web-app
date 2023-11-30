import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import * as client from "./client";
import * as profileClient from "../Profile/client";

function AnimalCard({ animal, add, removeAnimal, onUnlike }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await profileClient.getAccount();
                setUser(userData);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const [isLiked, setIsLiked] = useState(false);
    const [likedLikeId, setLikedLikeId] = useState(null);

    useEffect(() => {
        const checkLikedStatus = async () => {
            if (user && user.username) {
                const likedPets = await client.getLikedPets(user._id);
                // Look for the likes for this pet
                const petLikes = likedPets.filter(pet => pet.petId === animal._id);

                // Go through to see if this user liked it
                if (petLikes.length >= 1) {
                    const like = petLikes.some(like => like.userId === user._id);
                    setIsLiked(like);
                }
            }
        };

        checkLikedStatus();
    }, [user, animal._id]);

    const toggleLike = async () => {
        if (user) {
            const userLikes =  await client.getUserLikes(user._id);

            if (isLiked) {
                if (onUnlike) {
                    onUnlike();
                }
                const likedAnimal = userLikes.find(pet => pet.petId === animal._id);
                await client.deleteLike(likedAnimal._id);
                setLikedLikeId(null);
            } else {
                const like = {
                    userId: user._id,
                    username: user.username,
                    petId: animal._id,
                    date: new Date(),
                };
                await client.addLike(like);
            }

            setIsLiked(!isLiked);
        }
    };

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
            status: "adoptable",
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

    return (
        <div className={"card my-3 mx-3"}>
            <div className="card-img-top">
                <img
                    src={animal.primary_photo_cropped ? animal.primary_photo_cropped.full : ""}
                    alt="Animal Image"
                    className="fill-image"
                />
            </div>

            {user ? <div className="vertical-dots">
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
                {!add && user.role === "ADMIN" ?
                 <FontAwesomeIcon
                     className='text-white ms-1'
                     icon={faTrash}
                     onClick={deletePet}
                 /> : <></>
                }
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
