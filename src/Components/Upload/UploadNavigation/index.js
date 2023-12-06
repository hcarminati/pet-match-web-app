import {Link, useLocation} from "react-router-dom";
import './index.css';

const UploadNavigation = () => {
    const links = [{
        "name": "New Pet",
        "url": "add",
    },
        {
            "name": "Uploads",
            "url": "uploads",
        }];
    const {pathname} = useLocation();

    return (
        <div className="list-group upload-nav-container">
            {links.map((link, index) => (
                <div className="admin-nav-item" key={index}>
                    <Link
                        to={link.name === "Home" ? `/Upload` : `/Upload/${link.url}`}
                        className={`admin-nav-link ${pathname.includes(link.url) && "active"}`}
                    >
                        {link.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default UploadNavigation;