import React from "react";
import "./index.css";
import {Link} from "react-router-dom";

function Signup() {
    return (
        <div className="content content-center">
            <div className="col-11 col-sm-12">
                <p className="header-logo-quiz content-center mb-3">
                    Sign Up
                </p>
                <form className="pet-match-quiz mx-auto">
                    <div className="form-group">
                        <label htmlFor="pet-match-quiz-living-situation" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="search-bar form-control me-2"
                            id="username"
                            placeholder="Enter your username"
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text-fields-assignment-name" className="form-label mt-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="search-bar form-control me-2"
                            id="search"
                            placeholder="Enter your password"
                        ></input>
                    </div>

                    <div className="form-group">
                        <div className="float-end mb-2">
                            <Link to={`/Home`}
                                  className="btn btn-secondary mt-2">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
