import db from "../Database";
import {Link, Route, useLocation, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faChevronRight,
    faGlasses,
} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import CourseNavigation from "./CourseNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";
import Index from "./TopNavigationBar";
import {Navigate, Routes} from "react-router";
import './index.css';
import MainNavigation from "./TopNavigationBar/MainNavigation";
import SecondCourseNavigation from "./TopNavigationBar/SecondCourseNavigation";

function Courses() {
    const {courseId} = useParams();
    const {pathname} = useLocation();
    const pathSegments = pathname.split("/");
    const lastParam = pathSegments[pathSegments.length - 1];
    const decodedLastParam = decodeURIComponent(lastParam.replace(/\+/g, " "));

    const course = db.courses.find((course) => course._id === courseId);

    const [divsVisible, setDivsVisible] = useState(true);
    const [mainNavigationVisible, setMainNavigationVisible] = useState(false);
    const [courseNavigationVisible, setCourseNavigationVisible] = useState(false);

    return (
        <div>
            <Index divsVisible={divsVisible} setDivsVisible={setDivsVisible}
                   mainNavigationVisible={mainNavigationVisible}
                   setMainNavigationVisible={setMainNavigationVisible}
                   courseNavigationVisible={courseNavigationVisible}
                   setCourseNavigationVisible={setCourseNavigationVisible}/>
            <div className="empty-space d-sm-none"></div>

            {divsVisible ? (
                <div className="courses-main-content">
                    <div className="courses-title-content d-none d-sm-block">
                        <div className="row mb-3">
                            <div className="col-9">
                                <div className="d-flex align-items-center mt-4 mb-2">
                                    <FontAwesomeIcon className="text-danger me-2" icon={faBars}/>

                                    <Link
                                        to={`/Kanbas/Courses/${courseId}/Home`}
                                        className="text-decoration-none text-danger ml-2 mb-0"
                                    >
                                        {course.name}
                                    </Link>
                                    <FontAwesomeIcon className="text-muted ms-2"
                                                     icon={faChevronRight}/>
                                    <p className="ml-2 mb-0 ms-2">{decodedLastParam}</p>
                                </div>
                            </div>
                            <div className="col-3">
                                <a className="btn btn-secondary float-end mt-3" role="button">
                                    <FontAwesomeIcon className="me-1"
                                                     icon={faGlasses}></FontAwesomeIcon>
                                    Student View
                                </a>
                            </div>
                        </div>
                        <hr className="title-hr"/>
                    </div>
                    <div className="ms-4 mt-4">
                        <div className="d-flex">
                            <CourseNavigation divsVisible={true}/>
                            <div className="courses-content-container">
                                <Routes>
                                    <Route path="/" element={<Navigate to="Home"/>}/>
                                    <Route path="Home" element={<Home/>}/>
                                    <Route path="Modules" element={<Modules/>}/>
                                    <Route path="Assignments" element={<Assignments/>}/>
                                    <Route
                                        path="Assignments/:assignmentId"
                                        element={<AssignmentEditor/>}/>
                                    <Route path="Grades" element={<Grades/>}/>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            ) : mainNavigationVisible ? (
                <div className="courseNavigation-top-nav">
                    <MainNavigation courseId={courseId}/>
                </div>
            ) : courseNavigationVisible ? (
                <div className="courseNavigation-top-nav">
                    <SecondCourseNavigation courseId={courseId}/>
                </div>
            ) : <></>}
        </div>
    );
}

export default Courses;
