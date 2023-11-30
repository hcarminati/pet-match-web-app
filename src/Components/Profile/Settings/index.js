import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Logout from "../Logout";
import SettingsNavigation from "./SettingsNavigation";
import EditProfile from "../Edit";
import ChangePassword from "./ChangePassword";
import Delete from "../DeleteAccount";

const Settings = () => {
    return (
        <div className="settings-container">
            <div className="d-flex">
                <SettingsNavigation />

                <div className=" flex-grow-1">
                    <Routes>
                        <Route path="/" element={<></>} />
                        <Route path="Edit" element={<EditProfile/>} />
                        <Route path="change-password" element={<ChangePassword/>} />
                        <Route path="Logout" element={<Logout />} />
                        <Route path="Delete" element={<Delete />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Settings;
