import React, { useState } from "react";
import {Link, Route} from "react-router-dom";

function SettingsNavigation() {

    return (
            <div className="col-md-3">
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
                </div>
            </div>
    );
}

export default SettingsNavigation;