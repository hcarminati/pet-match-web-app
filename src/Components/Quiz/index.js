// <form className="pet-match-quiz mx-auto" onSubmit={handleSubmit}>
//     {/* Size Dropdown */}
//     <div className="form-group">
//         <label htmlFor="size" className="form-label">
//             Size
//         </label>
//         <select
//             id="size"
//             className="publish-all-select form-select float-end mb-2 ms-1"
//         >
//             <option value="">Select an option</option>
//             <option value="small">Small</option>
//             <option value="medium">Medium</option>
//             <option value="large">Large</option>
//             <option value="xlarge">X-Large</option>
//         </select>
//     </div>
//
//     {/* Coat Text */}
//     <div className="form-group">
//         <label htmlFor="gender" className="form-label">
//             Coat
//         </label>
//         <select
//             id="coat"
//             className="publish-all-select form-select float-end mb-2 ms-1"
//         >
//             <option value="">Select an option</option>
//             <option value="short">Short</option>
//             <option value="medium">Medium</option>
//             <option value="long">Long</option>
//             <option value="wire">Wire</option>
//             <option value="hairless">Hairless</option>
//             <option value="curly">Curly</option>
//         </select>
//     </div>
//
//     {/* Good w/ Children Text */}
//     <div className="form-group">
//         <label htmlFor="good-w-children" className="form-label">
//             Good with children
//         </label>
//         <select
//             id="good-w-children"
//             className="publish-all-select form-select float-end mb-2 ms-1"
//         >
//             <option value="">Select an option</option>
//             <option value="yes">Yes</option>
//             <option value="no">No</option>
//         </select>
//     </div>
//
//     {/* Good w/ Dogs Text */}
//     <div className="form-group">
//         <label htmlFor="good-w-dogs" className="form-label">
//             Good with dogs
//         </label>
//         <select
//             id="good-w-dogs"
//             className="publish-all-select form-select float-end mb-2 ms-1"
//         >
//             <option value="">Select an option</option>
//             <option value="yes">Yes</option>
//             <option value="no">No</option>
//         </select>
//     </div>
//
//     {/* Good w/ Cats Text */}
//     <div className="form-group ms-0">
//         <label htmlFor="good-w-cats" className="form-label">
//             Good with cats
//         </label>
//         <select
//             id="good-w-cats"
//             className="publish-all-select form-select"
//         >
//             <option value="">Select an option</option>
//             <option value="yes">Yes</option>
//             <option value="no">No</option>
//         </select>
//     </div>
//     <button type="submit" className="btn btn-danger mt-2">
//        Enter
//    </button>
//</form>

import React, {useEffect, useState} from "react";
import "./index.css";
import {Link} from "react-router-dom";
import * as animalCardClient from "../AnimalCard/client";
import AnimalCard from "../AnimalCard";

function Quiz() {
    const [allPets, setAllPets] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [quizResults, setQuizResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const initialSearchParameters = {
        name: "",
        coat: "",
        good_w_children: "",
        good_w_dogs: "",
        good_w_cats: "",
    }

    const [searchParameters, setSearchParameters] = useState(initialSearchParameters);

    useEffect(() => {
        const allPets = async () => {
            const pets = await animalCardClient.findAllPets();
            setQuizResults(pets);
            setAllPets(pets);
        };

        allPets();
    }, []);

    useEffect(() => {
        // Simulating fetching quiz results based on quiz parameters
        const fetchQuizResults = async () => {
            try {
                // Simulated asynchronous data fetching
                setLoading(true);
                // Perform API call or data filtering based on quiz parameters here
                // For demonstration, using local data
                // Replace this with actual API calls or logic to filter data
                const filteredResults = allPets.filter((animal) => {
                    /* Example filtering logic based on quiz parameters */
                    return (
                        (!searchParameters.name || animal.name.toLowerCase()
                            .includes(searchParameters.name.toLowerCase())) &&
                        (!searchParameters.type || animal.type.toLowerCase()
                         === searchParameters.type.toLowerCase()) &&
                        (!searchParameters.size || animal.size.toLowerCase()
                         === searchParameters.size.toLowerCase()) &&
                        (!searchParameters.gender || animal.gender.toLowerCase()
                         === searchParameters.gender.toLowerCase()) &&
                        (!searchParameters.age || animal.age.toLowerCase()
                         === searchParameters.age.toLowerCase())
                    );
                });

                setQuizResults(filteredResults);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (submitted) {
            fetchQuizResults();
        }
    }, [submitted]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here, if needed
        setSubmitted(true);
    };

    return (
        <div className="content content-center">
            <div className="col-11 col-sm-12">
                {!submitted ? (
                    <div>

                        <form className="pet-match-quiz mx-auto" onSubmit={handleSubmit}>
                            {/* Size Dropdown */}
                            <div className="form-group">
                                <label htmlFor="size" className="form-label">
                                    Size
                                </label>
                                <select
                                    id="size"
                                    className="publish-all-select form-select float-end mb-2 ms-1"
                                    onChange={e => setSearchParameters({
                                                                           ...searchParameters,
                                                                           size: e.target.value,
                                                                       })}
                                >
                                    <option value="">Select an option</option>
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    <option value="xlarge">X-Large</option>
                                </select>
                            </div>

                            {/* Coat Text */}
                            <div className="form-group">
                                <label htmlFor="gender" className="form-label">
                                    Coat
                                </label>
                                <select
                                    id="coat"
                                    className="publish-all-select form-select float-end mb-2 ms-1"
                                    onChange={e => setSearchParameters({
                                                                           ...searchParameters,
                                                                           coat: e.target.value,
                                                                       })}
                                >
                                    <option value="">Select an option</option>
                                    <option value="short">Short</option>
                                    <option value="medium">Medium</option>
                                    <option value="long">Long</option>
                                    <option value="wire">Wire</option>
                                    <option value="hairless">Hairless</option>
                                    <option value="curly">Curly</option>
                                </select>
                            </div>

                            {/* Good w/ Children Text */}
                            <div className="form-group">
                                <label htmlFor="good-w-children" className="form-label">
                                    Good with children
                                </label>
                                <select
                                    id="good-w-children"
                                    className="publish-all-select form-select float-end mb-2 ms-1"
                                    onChange={e => setSearchParameters({
                                                                           ...searchParameters,
                                                                           good_w_children: e.target.value,
                                                                       })}
                                >
                                    <option value="">Select an option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            {/* Good w/ Dogs Text */}
                            <div className="form-group">
                                <label htmlFor="good-w-dogs" className="form-label">
                                    Good with dogs
                                </label>
                                <select
                                    id="good-w-dogs"
                                    className="publish-all-select form-select float-end mb-2 ms-1"
                                    onChange={e => setSearchParameters({
                                                                           ...searchParameters,
                                                                           good_w_dogs: e.target.value,
                                                                       })}
                                >
                                    <option value="">Select an option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            {/* Good w/ Cats Text */}
                            <div className="form-group ms-0">
                                <label htmlFor="good-w-cats" className="form-label">
                                    Good with cats
                                </label>
                                <select
                                    id="good-w-cats"
                                    className="publish-all-select form-select"
                                    onChange={e => setSearchParameters({
                                                                           ...searchParameters,
                                                                           good_w_cats: e.target.value,
                                                                       })}
                                >
                                    <option value="">Select an option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            {!submitted && (
                                <div className="float-end mb-2">
                                    <Link to={`/Home`} className="btn btn-secondary mt-2">
                                        Cancel
                                    </Link>
                                    <button type="submit" className="btn btn-danger ms-2 mt-2"
                                            onClick={handleSubmit}>
                                        Enter
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                ) : (
                     <>
                         {loading ? (
                             <p>Loading...</p>
                         ) : error ? (
                             <p>Error: {error}</p>
                         ) : (
                                 <div className="quiz-results">
                                     <p className="header-logo-quiz content-center mb-3">Quiz
                                         Results</p>
                                     {console.log(quizResults)}
                                     <ul>
                                         <div className="list-group d-flex flex-row flex-wrap">
                                             {quizResults.map((petData) => (
                                                 <AnimalCard key={petData._id} animal={petData}/>
                                             ))}
                                         </div>
                                     </ul>
                                 </div>
                             )}
                     </>
                 )}
            </div>
        </div>
    );
}

export default Quiz;
