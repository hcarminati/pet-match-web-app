import React from "react";
import { Link } from "react-router-dom";

function EditProfile() {
    return (
        <div className="col-11 col-sm-12">
            <p className="header-logo-quiz content-center mb-3">
                Edit Profile
            </p>
            <form className="pet-match-quiz mx-auto">
                <form className="pet-match-quiz mx-auto">
                    {/* Good w/ Dogs Text */}
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Display Name
                        </label>
                        <input
                            type="text"
                            className="search-bar form-control me-2"
                            id="username"
                            placeholder="Enter profile name"
                        ></input>
                    </div>

                    {/* Description */}
                    <div className="form-group mt-2">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="search-bar form-control me-2"
                            id="description"
                            placeholder="Enter profile description"
                        ></input>
                    </div>
                </form>

                <div className="form-group">
                    <div className="float-end mb-2">
                        <Link to={`/Home`} className="btn btn-secondary mt-2">
                                                 Cancel
                                             </Link>

                                         <Link to={`/SearchResults`}>
                                             <button className="btn btn-danger ms-2 mt-2">Enter</button>
                                         </Link>
                    </div>
                </div>
            </form>
        </div>
        // </div>
    );
}

export default EditProfile;
