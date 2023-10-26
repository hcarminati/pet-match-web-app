import React from "react";
import SearchCourse from "../search/SearchCourse";
import AnimalCard from "../AnimalCard";
import "./index.css";

function HomePage({isLoggedIn, onLogout}) {

    return (
        <div className="home-container">
            <div className="home-search-content">
                <SearchCourse/>
            </div>
            <div className="home-content">
                <h4>Recently Adopted</h4>
                <div className="list-group d-flex flex-row flex-wrap">
                    <AnimalCard/>
                    <AnimalCard/>
                    <AnimalCard/>
                    <AnimalCard/>
                    <AnimalCard/>
                </div>

                <h4 className="mt-4">Recently Added</h4>
                <div className="list-group d-flex flex-row flex-wrap">
                    <AnimalCard/>
                    <AnimalCard/>
                    <AnimalCard/>
                    <AnimalCard/>
                    <AnimalCard/>
                </div>
            </div>

        </div>
    );
}

export default HomePage;
