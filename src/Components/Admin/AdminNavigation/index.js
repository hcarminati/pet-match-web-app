import {Link, useLocation} from "react-router-dom";
import './index.css';

const AdminNavigation = () => {
    const links = [{
        "name": "Add Pets",
        "url": "add",
    },
        {
            "name": "Users",
            "url": "users",
        }];
    const {pathname} = useLocation();

    return (
        <div className="list-group admin-nav-container d-none d-sm-block">
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