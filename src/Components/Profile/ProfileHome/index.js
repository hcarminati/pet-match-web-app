import React from 'react';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LikesComponent from "../../LikesComponent";
import {useEffect, useState} from "react";
import * as profileClient from "../client";

const ProfileHome = () => {
    const userReducer = useSelector((state) => state.userReducer);
    const { id } = useParams();
    const [user, setUser] = useState();
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await profileClient.getUserByUsername(userReducer.username);
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userReducer.username]);

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
            <div className="row">
                <div className="col-12 col-sm-4 pe-3">
                    <FontAwesomeIcon className="user-icon mb-3" icon={faUser}></FontAwesomeIcon>
                    <h4 className="profile-home-name mb-3">
                        {userReducer.username}
                        <span key="admin-badge" className={`badge badge-pill ms-2 ${
                            userReducer.role === "ADMIN" ? "bg-danger" :
                            userReducer.role === "ADOPTER" ? "bg-success" :
                            userReducer.role === "UPLOADER" ? "bg-primary" :
                            "bg-secondary"
                        } badge-xs`}>
                            {userReducer.role}
                        </span>
                        <Link to={`/Profile/Settings/Edit`} className="btn">
                            <FontAwesomeIcon className="text-muted" size="sm" icon={faPenToSquare}></FontAwesomeIcon>
                        </Link>
                    </h4>
                    <p>
                        {userReducer.email}
                    </p>
                    <p className="text-muted">
                        {userReducer.description}
                    </p>
                </div>
                <div className="col-12 col-sm-8">
                    <h4>Adopted</h4>
                    <h4>Favorites</h4>
                    <LikesComponent likes={likes}/>
                </div>
            </div>
        </div>
    );
}

export default ProfileHome;
