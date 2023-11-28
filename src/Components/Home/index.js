import React, {useEffect, useState} from "react";
import SearchCourse from "../searchCourses/SearchCourse";
import AnimalCard from "../AnimalCard";
import {getAnimals} from "../../api/petfinder-api";
import "./index.css";
import {getAvailablePets} from "../Admin/client";
import {useDispatch, useSelector} from "react-redux";

function HomePage() {
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.userReducer);

    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch animals when the component mounts
        getAvailablePets()
            .then((data) => {
                // Update the state with the fetched animals
                setAnimals(data);
                setLoading(false); // Update loading state when data is fetched
            })
            .catch((error) => {
                console.error(error);
                setLoading(false); // Update loading state if there's an error
            });
    }, []);

    return (
        <div className="home-container">
            <div className="home-search-content">
                {
                    userReducer.role === 'GUEST'
                    ? <SearchCourse/>
                    : <></>
                }
            </div>
            <div className="home-content">
                <h4 className="mt-4">Recently Added</h4>
                <div className="list-group d-flex flex-row flex-wrap">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                    animals.map((animal) =>
                                   (<AnimalCard animal={animal} add={false}/>)
                    )
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
