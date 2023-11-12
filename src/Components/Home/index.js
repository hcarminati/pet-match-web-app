import React, {useEffect, useState} from "react";
import SearchCourse from "../searchCourses/SearchCourse";
import AnimalCard from "../AnimalCard";
import {getAnimals} from "../../api/petfinder-api";
import "./index.css";

function HomePage() {

        const [animals, setAnimals] = useState([]);

        useEffect(() => {
            // Fetch animals when the component mounts
            getAnimals()
                .then((data) => {
                    // Update the state with the fetched animals
                    setAnimals(data.animals);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, []);

    return (
        <div className="home-container">
            <div className="home-search-content">
                <SearchCourse/>
            </div>
            <div className="home-content">
                <h4 className="mt-4">Recently Added</h4>
                <div className="list-group d-flex flex-row flex-wrap">
                    {animals.map((animal) =>
                                   (<AnimalCard animal={animal}/>)
                    )}
                </div>

                <h4>Recently Adopted</h4>
                <div className="list-group d-flex flex-row flex-wrap">
                    {/*<AnimalCard/>*/}
                    {/*<AnimalCard/>*/}
                    {/*<AnimalCard/>*/}
                    {/*<AnimalCard/>*/}
                    {/*<AnimalCard/>*/}
                </div>
            </div>

        </div>
    );
}

export default HomePage;
