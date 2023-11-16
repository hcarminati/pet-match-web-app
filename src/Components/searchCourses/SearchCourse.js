import React from "react";
import './SearchCourse.css';
import Button from '../common/Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const SearchCourse = () => {
    return (
        <div className="course-search-container">
            <div className="course-search-content">
                <h3>Take the quiz to get matched with a pet</h3>
                <Button linkTo="/Quiz" nameClass="basic-button grey-hover search-button"
                        text="Start Quiz"/>
                <span>
                    <FontAwesomeIcon icon={faSearch}
                                     className="home-faSearch me-2"></FontAwesomeIcon>
                    <Button linkTo="/Search" nameClass="search-for-course-load"
                            text="Search for a pet"/>
                </span>
            </div>
        </div>
    );
}

export default SearchCourse;