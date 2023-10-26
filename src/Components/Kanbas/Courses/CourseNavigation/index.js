import {Link, useParams, useLocation} from "react-router-dom";
import './index.css';
import db from "../../Database";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function CourseNavigation() {

    const links = ["Home", "Modules", "Piazza", "Zoom Meetings", "Assignments", "Quizzes", "Grades",
                   "People", "Panopto Video", "Discussions", "Announcements", "Pages", "Files",
                   "Rubrics", "Outcomes", "Collaborations", "Syllabus",
                   "Progress Reports (EAB Navigate)", "Settings"];
    const {courseId} = useParams();
    const {pathname} = useLocation();

    const course = db.courses.find((course) => course._id === courseId);
    return (
        <div className="list-group courses-nav-container d-none d-sm-block">
            <p className="nav-container-top-text">
                {course.number}.{courseId} {course.name}
            </p>
            {links.map((link, index) => (
                <div className="courses-nav-item" key={index}>
                    <Link
                        to={`/Kanbas/Courses/${courseId}/${link}`}
                        className={`courses-nav-link ${pathname.includes(link) && "active"}`}
                    >
                        {link}
                        {link === "Discussions" || link === "Announcements" || link === "Pages"
                         || link === "Files" ? (
                             <FontAwesomeIcon icon={faEye} className="float-end text-muted"/>
                         ) : (
                             <></>
                         )}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default CourseNavigation;