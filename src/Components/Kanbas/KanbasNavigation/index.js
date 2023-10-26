import React from "react";
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUser,
    faDashboard,
    faBook,
    faCalendar,
    faInbox,
    faClock,
    faComputer,
    faArrowRight,
    faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import northeastern_logo from "../assets/northeastern_logo.jpg";

function KanbasNavigation() {
    const links = [
        {name: "Account", icon: faUser},
        {name: "Dashboard", icon: faDashboard},
        {name: "Courses", icon: faBook},
        {name: "Calendar", icon: faCalendar},
        {name: "Inbox", icon: faInbox},
        {name: "History", icon: faClock},
        {name: "Studio", icon: faComputer},
        {name: "Commons", icon: faArrowRight},
        {name: "Help", icon: faQuestionCircle},
    ];
    const {pathname} = useLocation();

    return (
        <div className="account-sidebar d-none d-sm-block">
            <img className="square-image" src={northeastern_logo} alt="Northeastern Logo"/>
            {links.map((link, index) => (
                <Link
                    key={index}
                    to={
                        link.name === "Courses"
                        ? `/Kanbas/${link.name}/RS101`
                        : `/Kanbas/${link.name}`
                    }
                    className={`list-group-item nav-link ${pathname.includes(link.name)
                                                           ? 'active' : ''}`}
                >
                    <FontAwesomeIcon
                        className={`icon ${link.name === 'Account' ? 'account-icon' : ''}`}
                        icon={link.icon}
                    /> {link.name}
                </Link>
            ))}
        </div>
    );
}

export default KanbasNavigation;