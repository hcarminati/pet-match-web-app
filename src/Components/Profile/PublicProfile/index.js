import React, { useEffect, useState } from 'react';
import './index.css';
import {Link, useParams} from 'react-router-dom';
import * as client from '../../Admin/client';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faUser} from "@fortawesome/free-solid-svg-icons";

const PublicProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await client.getUserById(id);
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="row">
                <div className="col-12 col-sm-4 pe-3">
                    <FontAwesomeIcon className="user-icon mb-3" icon={faUser}></FontAwesomeIcon>
                    <h4 className="profile-home-name mb-3">
                        {user.username}
                        <span key="admin-badge" className={`badge badge-pill ms-2 ${
                            user.userType === "admin" ? "bg-danger" :
                            user.userType === "adopter" ? "bg-success" :
                            user.userType === "uploader" ? "bg-primary" :
                            "bg-secondary"
                        } badge-xs`}>
                            {user.userType}
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
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
