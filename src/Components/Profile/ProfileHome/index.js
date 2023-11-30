import React from 'react';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LikesComponent from "../../LikesComponent";
import {useEffect, useState} from "react";
import * as profileClient from "../client";
import AdoptedComponent from "../../AdoptedComponent";
import CommentComponent from "../../Comments";

const ProfileHome = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [adoptedPets, setAdoptedPets] = useState([]);

    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.userReducer);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await profileClient.getAccount();
                setUser(userData);
            } catch (error) {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user && user._id) {
                    const userComments = await profileClient.findCommentsByUserId(user._id);
                    setComments(userComments || []);
                    const userLikes = await profileClient.findLikesByUserId(user._id);
                    setLikes(userLikes || []);
                }
            } catch (error) {
                console.error('Error fetching comments and likes:', error);
            }
        };

        fetchData();
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
                            <FontAwesomeIcon className="text-muted" size="sm" icon={faPenToSquare}></FontAwesomeIcon>
                        </Link>
                    </h4>
                    <p>
                        {user.email}
                    </p>
                    <p className="text-muted">
                        {user.description}
                    </p>
                </div>
                <div className="col-12 col-sm-8">
                    <h4>Adopted</h4>
                    {/*<AdoptedComponent/>*/}
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
