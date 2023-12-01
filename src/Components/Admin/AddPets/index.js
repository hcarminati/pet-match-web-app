import React, { useState, useEffect } from 'react';
import './index.css';
import { getAnimals } from '../../../api/petfinder-api';
import AnimalCard from '../../AnimalCard';
import {getAvailablePets} from "../client";
import {useLocation} from "react-router-dom";

const AddPets = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const initialSearchParameters = {
        name: searchParams.get("name") || "",
        type: searchParams.get("type") || "",
        size: searchParams.get("size") || "",
        gender: searchParams.get("gender") || "",
        age: searchParams.get("age") || "",
    };

    const [animals, setAnimals] = useState([]);
    const [dbAnimals, setDbAnimals] = useState([]);
    const [searchParameters, setSearchParameters] = useState(initialSearchParameters);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            setLoading(true);

            const query = new URLSearchParams();
            let hasSearchParams = false;
            for (const key in searchParameters) {
                if (searchParameters[key]) {
                    query.set(key, searchParameters[key]);
                    hasSearchParams = true;
                }
            }

            let result;
            if (searchParameters.name || searchParameters.type || searchParameters.size || searchParameters.gender || searchParameters.age) {
                const filteredPets = animals.filter(animal => {
                    return (
                        (!searchParameters.name || animal.name.toLowerCase().includes(searchParameters.name.toLowerCase())) &&
                        (!searchParameters.type || animal.type.toLowerCase() === searchParameters.type.toLowerCase()) &&
                        (!searchParameters.size || animal.size.toLowerCase() === searchParameters.size.toLowerCase()) &&
                        (!searchParameters.gender || animal.gender.toLowerCase() === searchParameters.gender.toLowerCase()) &&
                        (!searchParameters.age || animal.age.toLowerCase() === searchParameters.age.toLowerCase())
                    );
                });

                window.history.replaceState(null, "", `#/Admin/Add/Search?${query.toString()}`);

                result = { animals: filteredPets };
            } else {
                result = { animals: searchResults };
            }

            setSearchResults(result.animals);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleParameterChange = (parameter, value) => {
        setSearchParameters((prevParameters) => ({
            ...prevParameters,
            [parameter]: value,
        }));
    };

    useEffect(() => {
        Promise.all([getAnimals(), getAvailablePets()])
            .then(([petfinderAnimals, databaseAnimals]) => {
                setAnimals(petfinderAnimals.animals);
                setSearchResults(petfinderAnimals.animals);
                setDbAnimals(databaseAnimals);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const isInDatabase = (animal) => {
        return dbAnimals.some((dbAnimal) => dbAnimal.originalId === animal.id);
    };

    return (
        <div className="add-pets-container">
            <h2>Add Pets</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="content-center search-page-content">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pet Name"
                            value={searchParameters.name || ""}
                            onChange={(e) => handleParameterChange("name", e.target.value)}
                        />
                        <button className="btn btn-secondary" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                    <div className="filter-section">
                        <select
                            className="form-select"
                            value={searchParameters.size}
                            onChange={(e) => handleParameterChange("size", e.target.value)}
                        >
                            <option value="">Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                        <select
                            className="form-select"
                            value={searchParameters.age}
                            onChange={(e) => handleParameterChange("age", e.target.value)}
                        >
                            <option value="">Age</option>
                            <option value="baby">Baby</option>
                            <option value="young">Young</option>
                            <option value="adult">Adult</option>
                            <option value="senior">Senior</option>
                        </select>
                        <select
                            className="form-select"
                            value={searchParameters.gender}
                            onChange={(e) => handleParameterChange("gender", e.target.value)}
                        >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <select
                            className="form-select"
                            value={searchParameters.type}
                            onChange={(e) => handleParameterChange("type", e.target.value)}
                        >
                            <option value="">Type</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="rabbit">Rabbit</option>
                            <option value="rat">Rat</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="search-results">
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {searchResults.length > 0 && (
                            <div className="list-group d-flex flex-row flex-wrap">
                                {searchResults
                                    .filter((animal) => !isInDatabase(animal))
                                    .map((animal) => (
                                        <AnimalCard animal={animal} add={true}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
             )}
        </div>
    );
};

export default AddPets;
