import React from 'react';
import './index.css';
import ProfileNavigation from "./ProfileNavigation";
import {Route} from "react-router-dom";
import {Navigate, Routes} from "react-router";
import ProfileHome from "./ProfileHome";
import Settings from "./Settings";

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="ms-4 mt-4">
                    <div className="d-flex">
                        <ProfileNavigation/>
                        <div className="courses-content-container flex-grow-1">
                            <Routes>
                                <Route path="/" element={<ProfileHome/>}/>
                                <Route path="Home" element={<Navigate to="/Profile"/>}/>
                                <Route path="Adopted" element={<h1>Adopted</h1>}/>
                                <Route path="Favorites" element={<h1>Favorites</h1>}/>
                                <Route path="/Settings/*" element={<Settings/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
