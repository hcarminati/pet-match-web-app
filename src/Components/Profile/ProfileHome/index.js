import React from 'react';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector from react-redux

const ProfileHome = () => {
    // Use useSelector to access the user information from the Redux store
    const user = useSelector((state) => state.userReducer);

    return (
        <div className="profile-home-container">
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
                        <Link to={`/Profile/Settings/Edit`} className="btn">
                            <FontAwesomeIcon className="text-muted" size="sm" icon={faPenToSquare}></FontAwesomeIcon>
                        </Link>
                    </h4>
                    <p>
                        Successful matches: 3
                    </p>
                    <p className="text-muted">
                        {user.description}
                    </p>
                </div>
                <div className="col-12 col-sm-8">
                    <h4>Adopted</h4>
                    <h4>Favorites</h4>
                </div>
            </div>
        </div>
    );
}

export default ProfileHome;
