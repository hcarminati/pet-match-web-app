import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBook, faBullhorn, faBullseye, faCircle,
    faCircleNodes, faClipboard, faCog, faComment, faEyeSlash,
    faFile, faFolder,
    faHome,
    faPlug,
    faRocket, faUser
} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation} from "react-router-dom";

function SecondCourseNavigation({courseId}) {
    const location = useLocation();
    const isActive = (pathname) => location.pathname === pathname;

    return (
        <ul className="nav flex-column">

            <li className="nav-item">
                <Link to={`/Kanbas/Courses/${courseId}/Home`}
                      className={`nav-link text-danger ${isActive(
                          `/Kanbas/Courses/${courseId}/Home`)
                                                         ? "fw-bold" : ""}`}>
                    <FontAwesomeIcon icon={faHome}/>
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link to={`/Kanbas/Courses/${courseId}/Modules`}
                      className={`nav-link text-danger ${isActive(
                          `/Kanbas/Courses/${courseId}/Modules`)
                                                         ? "fw-bold" : ""}`}>
                    <FontAwesomeIcon icon={faCircleNodes}/> Modules
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faPlug}/> Piazza
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faPlug}/> Zoom Meetings
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faFile}/> Assignments
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faRocket}/> Quizzes
                </Link>
            </li>

            <li className="nav-item">
                <Link to={`/Kanbas/Courses/${courseId}/Grades`}
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faBook}/> Grades
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faUser}/> People
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faPlug}/> Panopto Video
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                    Discussions
                    <FontAwesomeIcon className="text-muted" icon={faEyeSlash}></FontAwesomeIcon>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faBullhorn}></FontAwesomeIcon>
                    Announcements
                    <FontAwesomeIcon className="text-muted" icon={faEyeSlash}></FontAwesomeIcon>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>
                    Pages
                    <FontAwesomeIcon className="text-muted" icon={faEyeSlash}></FontAwesomeIcon>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faFolder}></FontAwesomeIcon>
                    Files
                    <FontAwesomeIcon className="text-muted" icon={faEyeSlash}></FontAwesomeIcon>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faClipboard}></FontAwesomeIcon>
                    Rubrics
                    <FontAwesomeIcon className="text-muted" icon={faEyeSlash}></FontAwesomeIcon>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faBullseye}></FontAwesomeIcon>
                    Outcomes
                    <FontAwesomeIcon className="text-muted" icon={faEyeSlash}></FontAwesomeIcon>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
                    Collaborations
                    <FontAwesomeIcon className="text-muted" icon={faEyeSlash}></FontAwesomeIcon>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                    Syllabus
                    <FontAwesomeIcon className="text-muted" icon={faEyeSlash}></FontAwesomeIcon>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>
                    Progress Reports (EAB Navigate)
                </Link>
            </li>

            <li className="nav-item">
                <Link to="#"
                      className="nav-link text-danger">
                    <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                    Settings
                </Link>
            </li>

        </ul>
    );
}

export default SecondCourseNavigation;