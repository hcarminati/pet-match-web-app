import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faHeart, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import * as client from "./client";
import * as adminClient from "../Admin/client";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditAnimal from "../EditAnimal";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../Profile/userReducer";

function AnimalCard({animal, add, removeAnimal, onUnlike}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);
    const [loading, setLoading] = useState(true);
    const [numAdded, setNumAdded] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setNumAdded(user.numAdded)
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const [isLiked, setIsLiked] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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
            const userLikes = await client.getUserLikes(user._id);

            if (isLiked) {
                if (onUnlike) {
                    onUnlike();
                }
                const likedAnimal = userLikes.find(pet => pet.petId === animal._id);
                await client.deleteLike(likedAnimal._id);
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
            uploader: user._id,
        }

        setNumAdded(prevNumAdded => prevNumAdded + 1);

        const newUser = {
            ...user,
            numAdded: numAdded + 1,
        };

        console.log(newUser)

        await client.addPet(newAnimal);
        await adminClient.updateUserById(newUser);
        setIsLiked(!isLiked);
        dispatch(setUser(newUser));
    }

    const deletePet = async () => {
        if (removeAnimal) {
            removeAnimal(animal._id);
        }
        await client.deletePet(animal);
    }

    const editPet = async () => {
        // Implement logic to show the edit modal/pop-up
        setShowEditModal(true);
    };

    return (
        <div className={"card my-3 mx-3"}>
            <div className="card-img-top">
                <img
                    src={animal.primary_photo_cropped ? animal.primary_photo_cropped.full : ""}
                    alt={`${animal.breeds.primary}`}
                    className="fill-image"
                />
            </div>
            {showEditModal && (
                <Popup trigger={<button> Trigger</button>} position="right center" modal>
                    <div>Popup content here !!</div>
                </Popup>
            )}
            {user ? <div className="vertical-dots d-flex">
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
                 <div className="d-flex">
                     <FontAwesomeIcon
                         className='text-white ms-1'
                         icon={faTrash}
                         onClick={deletePet}
                     />
                     <Popup
                         trigger={
                             <FontAwesomeIcon
                                 className='text-white ms-1'
                                 icon={faEdit}
                                 onClick={editPet}
                             />
                         }
                         position="right center"
                         modal
                         contentStyle={{
                             width: "50%",
                             height: "70vh",
                             overflowY: "auto",
                         }}
                     >
                         <EditAnimal animal={animal}/>
                     </Popup>
                 </div> : <></>
                }
            </div> : <></>}
            <Link
                to={animal._id ? `/Pet/${animal._id}` : `/Admin/Pet/${animal.id}`}
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
