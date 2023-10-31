import {Link, useLocation} from "react-router-dom";
import './index.css';

const ProfileNavigation = () => {
    const links = ["Home", "Adopted", "Favorites", "Edit", "Logout"];
    const {pathname} = useLocation();

    return (
        <div className="list-group profile-nav-container d-none d-sm-block">
            {links.map((link, index) => (
                <div className="courses-nav-item" key={index}>
                    <Link
                        to={`/Profile/${link}`}
                        className={`courses-nav-link ${pathname.includes(link) && "active"}`}
                    >
                        {link}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ProfileNavigation;