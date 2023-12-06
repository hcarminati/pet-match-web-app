import React from "react";
import { Link, useLocation } from "react-router-dom";

function SettingsNavigation() {
    const { pathname } = useLocation();

    return (
        <div className="settings-navigation-container">
            <div className="list-group">
                <Link
                    to="/Profile/Settings/Edit"
                    className={`list-group-item bg-light ${pathname === "/Profile/Settings/Edit" ? "text-dark" : "text-muted"}`}
                >
                    Edit Profile
                </Link>
                <Link
                    to="/Profile/Settings/change-password"
                    className={`list-group-item bg-light ${pathname === "/Profile/Settings/change-password" ? "text-dark" : "text-muted"}`}
                >
                    Change Password
                </Link>
                <Link
                    to="/Profile/Settings/Logout"
                    className={`list-group-item bg-light ${pathname === "/Profile/Settings/Logout" ? "text-dark" : "text-muted"}`}
                >
                    Logout
                </Link>
                <Link
                    to="/Profile/Settings/Delete"
                    className={`list-group-item bg-light ${pathname === "/Profile/Settings/Delete" ? "text-dark" : "text-muted"}`}
                >
                    Delete Account
                </Link>
            </div>
        </div>
    );
}

export default SettingsNavigation;
