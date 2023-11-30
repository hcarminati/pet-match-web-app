import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from 'react-router-dom';
import { getAnimalById } from '../../api/petfinder-api';
import * as client from "./client";
import * as adminClient from "../Admin/client";
import * as animalClient from "../AnimalCard/client";
import {useDispatch, useSelector} from "react-redux";
import {getByUsername} from "../Login/client";
import {deleteComment, findCommentsByPetId} from "./client";
import CommentComponent from "../Comments";
import * as profileClient from "../Profile/client";

const PetProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    const [petData, setPetData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
                                                     userId: "",
                                                     username: "",
                                                     petId: id,
                                                     date: Date(),
                                                     comment: "",
                                                 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await profileClient.getAccount();
                setUser(userData);
            } catch (error) {
                setUser(null);
            }
        };

        fetchData();
    }, []);

    const getComments = async () => {
        const comments = await findCommentsByPetId(id);
        setComments(comments);
    }

    useEffect(() => {
        getComments();
        getAnimalById(id)
            .then(data => {
                setPetData(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, [id]);

    const addComment = async () => {
        if (newComment.comment.trim() !== '') {
            const comment = {
                              userId: user._id,
                              username: user.username,
                              petId: newComment.petId,
                              date: Date(),
                              comment: newComment.comment,
                          };
            client.addComment(id, comment).then(() => {
                setComments([
                                ...comments,
                                comment
                ]);
                setNewComment({
                                  userId: "",
                                  username: "",
                                  petId: id,
                                  date: Date(),
                                  comment: "",
                              });
            });
        }
    };

    const handleDeleteComment = async (commentId) => {
        await deleteComment(commentId);
    }

    if (!petData) {
        return <div>Loading...</div>;
    }

    const handleAdoptPet = async () => {
        let pet = await animalClient.findPetByOriginalId(petData.id);
        console.log(user)
    }
    return (
        <div className="pet-profile-container">
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            <div className="pet-profile-content">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 pe-3">
                        <h2>{petData.name}</h2>
                        <div className="pet-profile-image mt-3 float-end">
                            <img
                                src={petData.primary_photo_cropped ? petData.primary_photo_cropped.full : ""}
                                alt={petData.name}
                                className="fill-profile-image"
                            />
                        </div>
                    </div>
                    <div className="pet-profile-top-info col-12 col-sm-4 col-md-6">
                        <span className="badge bg-danger me-2 mb-2">
                            {petData.status === "adoptable" ? "Adoptable" : "Adopted"}</span>
                        <p><strong>Age:</strong> {petData.age}</p>
                        <p><strong>Species:</strong> {petData.species}</p>
                        <p><strong>Breed:</strong> {petData.breeds.primary}</p>

                        <div className="d-flex flex-wrap">
                            {petData.tags.map((tag, index) => (
                                <span key={index} className="badge bg-secondary me-2 mb-2">{tag}</span>
                            ))}
                        </div>

                        {user.role === "ADOPTER" && petData.status === "adoptable" ?
                         <button className="btn btn-info mt-2">
                             <Link className="text-decoration-none text-black"
                                   // to="/Profile/Adopted"
                                 onClick={handleAdoptPet}
                             >
                                 Adopt
                             </Link>
                         </button> :
                         <></>}
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <h5>Description</h5>
                        <p>{petData.description}</p>
                    </div>
                </div>
                <div className="row mt-3">
                    {/* Additional information section */}
                    <div className="col-12">
                        <h5>Additional Information</h5>
                        <ul>
                            {/*<li><strong>Attributes:</strong> {petData.attributes.join(', ')}</li>*/}
                            <li><strong>Coat:</strong> {petData.coat}</li>
                            <li><strong>Gender:</strong> {petData.gender}</li>
                            <li><strong>Size:</strong> {petData.size}</li>
                            <li><strong>Status:</strong> {petData.status}</li>
                            <li><strong>Type:</strong> {petData.type}</li>
                        </ul>
                    </div>
                </div>

                {/* Comment section */}
                <div className="row mt-4">
                    <div className="col-12">
                        <h5>Comments</h5>
                        {user.role != "GUEST" ?
                        <div>
                            <textarea
                                rows="4"
                                className="form-control mb-2"
                                placeholder="Add a comment"
                                value={newComment.comment}
                                onChange={(e) => setNewComment({
                                                                   ...newComment,
                                                                   comment: e.target.value})}
                            />
                            <button className="btn btn-primary" onClick={addComment}>Add Comment</button>
                        </div>
                                                     : <></>}
                        <CommentComponent user={user} comments={comments} handleDeleteComment={handleDeleteComment}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PetProfile;
