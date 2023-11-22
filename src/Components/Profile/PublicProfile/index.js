import React, { useEffect, useState } from 'react';
import './index.css';
import {Link, useParams} from 'react-router-dom';
import * as client from '../../Admin/client';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faUser} from "@fortawesome/free-solid-svg-icons";
import CommentComponent from "../../Comments";
import * as profileClient from "../client";

const PublicProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await client.getUserById(id);
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const comments = async () => {
            try {
                const comments = await profileClient.findCommentsByUserId(id);
                setComments(comments);
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

    console.log(comments)

    return (
        <div className="profile-container">
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
                    <h4>Comments</h4>
                    <CommentComponent comments={comments} />
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
