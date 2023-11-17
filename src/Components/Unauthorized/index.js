import React from 'react';
import SearchCourse from "../searchCourses/SearchCourse";
import AnimalCard from "../AnimalCard";
import Button from "../common/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faSearch} from "@fortawesome/free-solid-svg-icons";

const Unauthorized = ()  => {
    return (
        <div className="home-container">
            <div className="home-search-content">
                <div className="course-search-container">
                    <div className="course-search-content">
                        <FontAwesomeIcon icon={faCircleExclamation} className="fa-lg mb-3"/>
                        <h3>You are unauthorized to access this page.</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;