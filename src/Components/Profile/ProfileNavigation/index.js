import React from "react";
import { Link, useLocation } from "react-router-dom";
import './index.css';

const ProfileNavigation = () => {
    const links = ["Home", "Adopted", "Favorites", "Settings"];
    const { pathname } = useLocation();
    console.log(pathname);

    return (
        <div className="list-group profile-nav-container d-none d-sm-block">
            {links.map((link, index) => (
                <div className="courses-nav-item" key={index}>
                    <Link
                        to={link === "Home" ? "/Profile" : `/Profile/${link}`}
                        className={`courses-nav-link ${link === "Home" && pathname === "/Profile" ? "active" : ""} ${pathname.includes(link) && link !== "Home" ? "active" : ""}`}
                    >
                        {link}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ProfileNavigation;
