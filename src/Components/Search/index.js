import React, { useState, useEffect } from "react";
import "./index.css";
import { searchAnimals } from "../../api/petfinder-api";
import AnimalCard from "../AnimalCard";
import {useLocation} from "react-router-dom";
import * as animalCardClient from "../AnimalCard/client";

function Search() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const initialSearchParameters = {
        name: searchParams.get("name") || "",
        type: searchParams.get("type") || "",
        size: searchParams.get("size") || "",
        gender: searchParams.get("gender") || "",
        age: searchParams.get("age") || "",
    };

    const [searchParameters, setSearchParameters] = useState(initialSearchParameters);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect( () => {
        const allPets = async () => {
            const pets = await animalCardClient.findAllPets();
            setSearchResults(pets);
        };

        allPets();
    }, []);

    useEffect(() => {
        // Watch for changes in the URL parameters and update the search parameters
        const updatedSearchParameters = {
            name: searchParams.get("name") || "",
            type: searchParams.get("type") || "",
            size: searchParams.get("size") || "",
            gender: searchParams.get("gender") || "",
            age: searchParams.get("age") || "",
        };
        setSearchParameters(updatedSearchParameters);
    }, [location.search]);

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

            window.history.replaceState(null, "", `/Search?${query.toString()}`);

            let result;
            if (hasSearchParams) {
                result = await searchAnimals(query);
            } else {
                const allPets = await animalCardClient.findAllPets();
                result = { animals: allPets };
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

    return (
        <div className="content content-center search-page-content">
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
                            {searchResults.map((animal) => (
                                <AnimalCard animal={animal} />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
