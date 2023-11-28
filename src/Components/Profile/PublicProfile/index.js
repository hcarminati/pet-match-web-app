import React, { useEffect, useState } from 'react';
import './index.css';
import {Link, useParams} from 'react-router-dom';
import * as client from '../../Admin/client';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faUser} from "@fortawesome/free-solid-svg-icons";
import CommentComponent from "../../Comments";
import * as profileClient from "../client";
import {getByUsername} from "../../Login/client";
import {useDispatch, useSelector} from "react-redux";
import LikesComponent from "../../LikesComponent";
import {deleteComment} from "../../PetProfile/client";

const PublicProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.userReducer);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if(id === 'Home') {
                    const fetchedUser = await profileClient.getUserByUsername(userReducer.username);
                    setUser(fetchedUser);
                }
                else {
                    const fetchedUser = await client.getUserById(id);
                    setUser(fetchedUser);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const comments = async () => {
            try {
                if(id === 'Home') {
                    const comments = await profileClient.findCommentsByUserId(user._id);
                    setComments(comments);
                    const likes = await profileClient.findLikesByUserId(user._id);
                    setLikes(likes);
                }
                else {
                    const comments = await profileClient.findCommentsByUserId(id);
                    setComments(comments);
                    const likes = await profileClient.findLikesByUserId(id);
                    setLikes(likes);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchUser();
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
                    <h4>Favorites</h4>
                    <LikesComponent likes={likes}/>
                    <h4>Comments</h4>
                    <CommentComponent comments={comments} handleDeleteComment={handleDeleteComment}/>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
