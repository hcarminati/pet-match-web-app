import React, {useEffect, useState} from 'react';
import './index.css';
import {useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import CommentComponent from "../../Comments";
import * as profileClient from "../client";
import LikesComponent from "../../LikesComponent";
import {deleteComment} from "../../PetProfile/client";
import AdoptedComponent from "../../AdoptedComponent";
import AnimalCard from "../../AnimalCard";
import {useSelector} from "react-redux";
import {getAvailablePets} from "../../Admin/client";
import * as petProfileClient from "../../PetProfile/client";
import * as animalCardClient from "../../AnimalCard/client";

const PublicProfile = () => {
    const {id} = useParams();
    const [user, setUser] = useState(null);
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
        const fetchData = async () => {
            try {
                const userData = await profileClient.findUserById(id);
                setUser(userData);
            } catch (error) {
                setUser(null);
            }
        };

        fetchData();
    });

    useEffect(() => {
        const comments = async () => {
            try {
                if (id === 'Home') {
                    const userAdoptedPets = await profileClient.findAdoptedPetsByUserId(user._id);
                    setAdoptedPets(userAdoptedPets || []);
                    const comments = await profileClient.findCommentsByUserId(user._id);
                    setComments(comments);
                    const likes = await profileClient.findLikesByUserId(user._id);
                    setLikes(likes);
                } else {
                    const userAdoptedPets = await profileClient.findAdoptedPetsByUserId(id);
                    setAdoptedPets(userAdoptedPets || []);
                    const comments = await profileClient.findCommentsByUserId(id);
                    setComments(comments);
                    const likes = await profileClient.findLikesByUserId(id);
                    setLikes(likes);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        comments();
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleDeleteComment = async (commentId) => {
        await deleteComment(commentId);
        const updatedComments = comments.filter(comment => comment._id !== commentId);
        setComments(updatedComments);
    }

    return (
        <div className="public-profile-container">
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
                    </h4>
                    <p className="text-muted">
                        {user.description}
                    </p>
                </div>
                <div className="col-12 col-sm-8">
                    {user && user.role === 'ADMIN' &&
                     <div>
                         <h4 className="mt-4">Recently Added by {user.usernam}</h4>
                         <div className="list-group d-flex flex-row flex-wrap">
                             {uploadedByUserLoading ? (
                                 <p>Loading...</p>
                             ) : (
                                  uploadedByUser.slice(uploadedByUser.length - 4, uploadedByUser.length)
                                      .map((animal) => (
                                          <AnimalCard key={animal._id} animal={animal} add={false}/>
                                      ))
                              )}
                         </div>
                     </div>
                    }
                    {user && user.role === 'UPLOADER' &&
                     <div>
                         <h4 className="mt-4">Recently Uploaded by {user.username}</h4>
                         <div className="list-group d-flex flex-row flex-wrap">
                             {loading ? (
                                 <p>Loading...</p>
                             ) : (
                                  uploadedByUser.slice(animals.length - 4, animals.length).map((animal) => (
                                      <AnimalCard key={animal._id} animal={animal} add={false}/>
                                  ))
                              )}
                         </div>
                     </div>
                    }
                    {user && user.role === 'ADOPTER' &&
                     <div>
                         <h4 className="mt-4">Recently Adopted by {user.username}</h4>
                         <div className="list-group d-flex flex-row flex-wrap">
                             {adoptedByUserLoading ? (
                                 <p>Loading...</p>
                             ) : (
                                  adoptedByUser.slice(adoptedByUser.length - 4, adoptedByUser.length)
                                      .map((animal) => (
                                          <AnimalCard key={animal._id} animal={animal} add={false}/>
                                      ))
                              )}
                         </div>
                     </div>
                    }
                    <h4>Favorites</h4>
                    <LikesComponent likes={likes}/>
                    <h4>Comments</h4>
                    <CommentComponent user={user}
                                      comments={comments}
                                      handleDeleteComment={handleDeleteComment}
                                      publicProfile={true}/>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
