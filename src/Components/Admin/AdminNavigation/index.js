import {Link, useLocation} from "react-router-dom";
import './index.css';

const AdminNavigation = () => {
    const links = [{
        "name": "Add Pets",
        "url": "add",
    },
        {
            "name": "Available Pets",
            "url": "available",
        },
        {
            "name": "Adopted Pets",
            "url": "adopted",
        },
        {
            "name": "Adoption Centers",
            "url": "acenter",
        },
        {
            "name": "Users",
            "url": "users",
        }];
    const {pathname} = useLocation();

    return (
        <div className="list-group admin-navigation-container">
            {links.map((link, index) => (
                <div className="admin-nav-item" key={index}>
                    <Link
                        to={link.name === "Home" ? `/Admin` : `/Admin/${link.url}`}
                        className={`admin-nav-link ${pathname.includes(link.url) && "active"}`}
                    >
                        {link.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default AdminNavigation;