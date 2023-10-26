import "./index.css";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faChevronDown, faEye, faGlasses, faX} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation, useParams} from "react-router-dom";

function Index({
                   divsVisible,
                   setDivsVisible,
                   mainNavigationVisible,
                   setMainNavigationVisible,
                   courseNavigationVisible,
                   setCourseNavigationVisible
               }) {
    const {courseId} = useParams();
    const {pathname} = useLocation();
    const pathSegments = pathname.split("/");
    const lastParam = pathSegments[pathSegments.length - 1];

    function setVisibilityMainNav() {
        courseNavigationVisible ? setDivsVisible(false) : setDivsVisible(!divsVisible);
        setMainNavigationVisible(!mainNavigationVisible)
        setCourseNavigationVisible(false)
    }

    function setVisibilityCourseNav() {
        mainNavigationVisible ? setDivsVisible(false) : setDivsVisible(!divsVisible);
        setCourseNavigationVisible(!courseNavigationVisible);
        setMainNavigationVisible(false)
    }

    return (
        <div className="black-top-navbar d-sm-none">
            <div className="row text-white">
                <div className="col-3">
                    <Link onClick={() => setVisibilityMainNav()}>
                        {!mainNavigationVisible ?
                         <FontAwesomeIcon className="text-white" icon={faBars}></FontAwesomeIcon> :
                         <FontAwesomeIcon className="text-white" icon={faX}></FontAwesomeIcon>}
                    </Link>

                </div>
                <div className="col-6 text-white text-center">
                    <p className="text m-0">{courseId}</p>
                    <p className="text m-0">{lastParam}</p>
                </div>
                <div className="col-3 text-white">
                    <Link onClick={() => setVisibilityCourseNav()}>
                        {!courseNavigationVisible ?
                         <FontAwesomeIcon className="float-end ms-3 text-white"
                                          icon={faChevronDown}></FontAwesomeIcon> :
                         <FontAwesomeIcon className="float-end ms-3 text-white"
                                          icon={faX}></FontAwesomeIcon>}
                    </Link>
                    <FontAwesomeIcon className="float-end"
                                     icon={faGlasses}></FontAwesomeIcon>
                </div>
            </div>
        </div>
    );
}

export default Index;