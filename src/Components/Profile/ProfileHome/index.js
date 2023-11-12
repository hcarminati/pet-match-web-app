import React from 'react';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPenToSquare, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const ProfileHome = () => {
    return (
        <div className="profile-home-container">
            <div className="row">
                <div className="col-12 col-sm-4 pe-3">
                    <FontAwesomeIcon className="user-icon mb-3" icon={faUser}></FontAwesomeIcon>
                    <p className="profile-home-name mb-3">
                        Heather Carminati
                        <Link to={`/Profile/Edit`} className="btn">
                            <FontAwesomeIcon className="text-muted" size="sm" icon={faPenToSquare}></FontAwesomeIcon>

                        </Link>
                    </p>
                    <p>
                        Successful matches: 3
                    </p>
                    <p className="text-muted">
                        Hello, pet lovers! I'm a proud pet parent with a heart full of love for my four-legged companions. My journey with pets began years ago, and I couldn't imagine life without them.
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
