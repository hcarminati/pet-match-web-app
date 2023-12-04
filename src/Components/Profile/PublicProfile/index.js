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

const PublicProfile = () => {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [adoptedPets, setAdoptedPets] = useState([]);

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
                    <h4>Adopted</h4>
                    <AdoptedComponent adoptedPets={adoptedPets}/>
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
