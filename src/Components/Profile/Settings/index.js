import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Logout from "../Logout";
import SettingsNavigation from "./SettingsNavigation";
import EditProfile from "../Edit";
import ChangePassword from "./ChangePassword";
import Delete from "../DeleteAccount";

const Settings = () => {
    return (
        <div className="settings-container">
            <div className="row">
                <div className="col-12 col-sm-4 col-md-3 col-lg-2 mt-3">
                    <SettingsNavigation/>
                </div>

                <div className="pet-profile-top-info col-12 col-sm-8 col-md-9 col-lg-10 mt-3">
                    <div className=" flex-grow-1">
                        <Routes>
                            <Route path="/" element={<></>}/>
                            <Route path="Edit" element={<EditProfile/>}/>
                            <Route path="change-password" element={<ChangePassword/>}/>
                            <Route path="Logout" element={<Logout/>}/>
                            <Route path="Delete" element={<Delete/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
