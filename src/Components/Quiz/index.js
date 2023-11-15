import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

function Quiz() {
    return (
        <div className="content content-center">
            <div className="col-11 col-sm-12">
                <p className="header-logo-quiz content-center mb-3">
                    Pet
                    <span className="header-logo-quiz-highlight">Match</span>
                    &nbsp;Quiz
                </p>
                <form className="pet-match-quiz mx-auto">
                    {/* Size Dropdown */}
                    <div className="form-group">
                        <label htmlFor="size" className="form-label">
                            Size
                        </label>
                        <select
                            id="size"
                            className="publish-all-select form-select float-end mb-2 ms-1"
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
                        >
                            <option value="">Select an option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </form>
                <hr />

                <div id="footer">
                    <div className="float-end mb-2">
                        <Link to={`/Home`} className="btn btn-secondary mt-2">
                            Cancel
                        </Link>

                        <Link to={`/SearchResults`}>
                            <button className="btn btn-danger ms-2 mt-2">Enter</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
