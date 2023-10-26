import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBook,
    faChevronRight,
    faCircleNodes, faComments,
    faFile,
    faHome,
    faPlug, faRocket, faUser
} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation} from "react-router-dom";

function MainNavigation({courseId}) {
    const location = useLocation();
    const isActive = (pathname) => location.pathname === pathname;

    return (
        <div className="mt-4">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to={`/Kanbas/Dashboard`}
                          className={`nav-link text-danger ${isActive("/Kanbas/Dashboard")
                                                             ? "fw-bold" : ""}`}>
                        <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={`/Kanbas/Account`}
                          className={`nav-link text-danger ${isActive("/Kanbas/Account") ? "fw-bold"
                                                                                         : ""}`}>
                        <FontAwesomeIcon icon={faCircleNodes}></FontAwesomeIcon>
                        Account
                        <FontAwesomeIcon className="float-end text-muted"
                                         icon={faChevronRight}></FontAwesomeIcon>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Home`}
                          className={`nav-link text-danger ${isActive(
                              `/Kanbas/Courses/${courseId}/Home`) ? "fw-bold" : ""}`}>
                        <FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>
                        Courses
                        <FontAwesomeIcon className="float-end text-muted"
                                         icon={faChevronRight}></FontAwesomeIcon>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="#"
                          className="nav-link text-danger">
                        <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>
                        Calendar
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="#"
                          className="nav-link text-danger">
                        <FontAwesomeIcon icon={faRocket}></FontAwesomeIcon>
                        Inbox
                        <span className="badge bg-danger">10</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="#"
                          className="nav-link text-danger">
                        <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                        Studio
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="#"
                          className="nav-link text-danger">
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                        Commons
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="#"
                          className="nav-link text-danger">
                        <FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>
                        History
                        <FontAwesomeIcon className="float-end text-muted"
                                         icon={faChevronRight}></FontAwesomeIcon>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="#"
                          className="nav-link text-danger">
                        <FontAwesomeIcon icon={faComments}></FontAwesomeIcon>
                        Help
                        <FontAwesomeIcon className="float-end text-muted"
                                         icon={faChevronRight}></FontAwesomeIcon>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default MainNavigation;