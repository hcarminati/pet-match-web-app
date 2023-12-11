import React, {useEffect, useState} from 'react';
import './index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import LikesComponent from "../../LikesComponent";
import CommentComponent from "../../Comments";
import {format} from "date-fns";
import AnimalCard from "../../AnimalCard";
import {getAvailablePets} from "../../Admin/client";
import * as petProfileClient from "../../PetProfile/client";
import * as animalCardClient from "../../AnimalCard/client";
import * as profileClient from "../client";

const ProfileHome = () => {
    const user = useSelector(state => state.userReducer);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [adoptedPets, setAdoptedPets] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);

    const [allAdoptedPetsMinData, setAllAdoptedPetsMinData] = useState([]);
    const [allAdoptedPets, setAllAdoptedPets] = useState([]);
    const [allAdoptedPetsLoading, setAllAdoptedPetsLoading] = useState(true);

    const [adoptedByUser, setAdoptedByUser] = useState([]);
    const [adoptedByUserLoading, setAdoptedByUserLoading] = useState(true);

    const [uploadedByUser, setUploadedByUser] = useState([]);
    const [uploadedByUserLoading, setUploadedByUserLoading] = useState(true);

    useEffect(() => {
        const fetchAnimals = async () => {
            getAvailablePets()
                .then((data) => {
                    setAnimals(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        };

        fetchAnimals();
    }, []);

    useEffect(() => {
        const fetchAllAdoptedPets = async () => {
            try {
                const data = await petProfileClient.getAllAdoptedPets();
                setAllAdoptedPetsMinData(data);

                const animalDataPromises = data.map(animal => animalCardClient.findPetById(animal.petId));
                const resolvedAnimalData = await Promise.all(animalDataPromises);
                const filteredData = resolvedAnimalData.filter(data => data !== null);
                setAllAdoptedPets(filteredData);
                setAllAdoptedPetsLoading(false);
            } catch (error) {
                console.error('Error fetching adopted pets:', error);
                setAllAdoptedPetsLoading(false);
            }
        };
        if (user && user._id && animals.length > 0) {
            fetchAllAdoptedPets();
        }
    }, [user, animals]);

    useEffect(() => {
        const fetchUploadedByUser = async () => {
            try {
                if (user && user._id) {
                    const uploadedPets = animals.filter(animal => animal.uploader === user._id);
                    setUploadedByUser(uploadedPets);
                    setUploadedByUserLoading(false);
                }
            } catch (error) {
                console.error('Error fetching uploaded pets:', error);
            }
        };
        if (user && user._id && animals.length > 0) {
            fetchUploadedByUser();
        }

    }, [user, animals]);

    useEffect(() => {
        const fetchAdoptedByUser = async () => {
            try {
                const adoptedByUser = allAdoptedPetsMinData.filter(
                    animal => animal.userId === user._id);
                const animalDataPromises = adoptedByUser.map(
                    animal => animalCardClient.findPetById(animal.petId));
                Promise.all(animalDataPromises)
                    .then(animalData => {
                        const filteredData = animalData.filter(data => data !== null);
                        setAdoptedByUser(filteredData);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                setAdoptedByUserLoading(false);
            } catch (error) {
                console.error('Error fetching adopted pets:', error);
                setAdoptedByUserLoading(false);
            }
        };
        if (user && user._id && animals.length > 0) {
            fetchAdoptedByUser();
        }
    }, [user, allAdoptedPetsMinData]);

    useEffect(() => {
        const comments = async () => {
            try {
                const userAdoptedPets = await profileClient.findAdoptedPetsByUserId(user._id);
                setAdoptedPets(userAdoptedPets || []);
                const comments = await profileClient.findCommentsByUserId(user._id);
                setComments(comments);
                const likes = await profileClient.findLikesByUserId(user._id);
                setLikes(likes);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        comments();
    }, [user]);

    return (
        <div className="profile-home-container">
            {user ? (
                <div className="row">
                    <div className="col-12 col-sm-4 pe-3">
                        <FontAwesomeIcon className="user-icon mb-3" icon={faUser}></FontAwesomeIcon>
                        <h4 className="profile-home-name mb-3">
                            {user.username}
                            <span key="admin-badge" className={`badge badge-pill ms-2 ${
                                user.role === "ADMIN" ? "bg-danger" :
                                user.role === "ADOPTER" ? "bg-success" :
                                user.role === "UPLOADER" ? "bg-primary" :
                                "bg-secondary"
                            } badge-xs`}>
                            {user.role}
                        </span>
                            <Link to={`/Profile/Settings/Edit`} className="btn">
                                <FontAwesomeIcon className="text-muted" size="sm"
                                                 icon={faPenToSquare}></FontAwesomeIcon>
                            </Link>
                        </h4>
                        <p>
                            {format(new Date(user.dob), 'MMMM dd, yyyy')}
                        </p>
                        <p>
                            {user.email}
                        </p>
                        <p className="text-muted">
                            {user.description}
                        </p>
                        {user && user.role === 'ADMIN' &&
                         <p>Number of pets added: {user.numAdded}</p>
                        }
                        {user && user.role === 'UPLOADER' &&
                         <p>Number of pets uploaded: {user.numUploaded}</p>
                        }
                        {user && user.role === 'ADOPTER' &&
                         <p>Number of pets adopted: {user.numAdopted}</p>
                        }
                    </div>
                    <div className="col-12 col-sm-8">
                        {user && user.role === 'ADMIN' &&
                         <div>
                             <h4 className="mt-4">Recently Added by You</h4>
                             <div className="list-group d-flex flex-row flex-wrap">
                                 {uploadedByUserLoading ? (
                                     <p>Loading...</p>
                                 ) : (
                                      uploadedByUser.slice(-4).map((animal) => (
                                              <AnimalCard key={animal._id} animal={animal} add={false}/>
                                          ))
                                  )}
                             </div>
                         </div>
                        }
                        {user && user.role === 'UPLOADER' &&
                         <div>
                             <h4 className="mt-4">Recently Uploaded by You</h4>
                             <div className="list-group d-flex flex-row flex-wrap">
                                 {loading ? (
                                     <p>Loading...</p>
                                 ) : (
                                     uploadedByUser.slice(-4).map((animal) => (
                                          <AnimalCard key={animal._id} animal={animal} add={false}/>
                                      ))
                                  )}
                             </div>
                         </div>
                        }
                        {user && user.role === 'ADOPTER' &&
                         <div>
                             <h4 className="mt-4">Recently Adopted by You</h4>
                             <div className="list-group d-flex flex-row flex-wrap">
                                 {adoptedByUserLoading ? (
                                     <p>Loading...</p>
                                 ) : (
                                      adoptedByUser.slice(-4).map((animal) => (
                                              <AnimalCard key={animal._id} animal={animal} add={false}/>
                                          ))
                                  )}
                             </div>
                         </div>
                        }
                        <h4>Favorites</h4>
                        <LikesComponent likes={likes}/>
                        <h4>Comments</h4>
                        <CommentComponent user={user} comments={comments}/>
                    </div>
                </div>
            ) : (
                 <p>Loading...</p>
             )}
        </div>
    );
}

export default ProfileHome;
