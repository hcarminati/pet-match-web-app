import React from "react";
import {Link} from "react-router-dom";

function SettingsNavigation() {

    return (
        <div className="settings-navigation-container col-md-3">
            <div className="list-group">
                <Link to="/Profile/Settings/Edit" className="list-group-item">
                    Edit Profile
                </Link>
                <Link to="/Profile/Settings/change-password" className="list-group-item">
                    Change Password
                </Link>
                <Link to="/Profile/Settings/Logout" className="list-group-item">
                    Logout
                </Link>
                <Link to="/Profile/Settings/Delete" className="list-group-item">
                    Delete Account
                </Link>
            </div>
        </div>
    );
}

export default SettingsNavigation;
