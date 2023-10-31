import React from 'react';
import './index.css';
import ProfileNavigation from "./ProfileNavigation";
import {Route} from "react-router-dom";
import {Navigate, Routes} from "react-router";
import Logout from "./Logout";
import ProfileHome from "./ProfileHome";

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="ms-4 mt-4">
                    <div className="d-flex">
                        <ProfileNavigation/>
                        <div className="courses-content-container flex-grow-1">
                            <Routes>
                                <Route path="/" element={<Navigate to="/Home"/>}/>
                                <Route path="Home" element={<ProfileHome/>}/>
                                <Route path="Adopted" element={<h1>Adopted</h1>}/>
                                <Route path="Favorites" element={<h1>Favorites</h1>}/>
                                <Route path="Edit" element={<h1>Edit</h1>}/>
                                <Route path="Logout" element={<Logout/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
