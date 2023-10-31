import { Link } from "react-router-dom";
import React from "react";
import {logout} from "../userReducer";
import {useDispatch} from "react-redux";

function Logout() {
    const dispatch = useDispatch();

    // Implement the handleLogout function to perform the actual logout
    function handleLogout() {
        // Add the logout logic here, e.g., clearing user session or making an API call.
        // After logging out, you can redirect the user to the login page or perform any other required actions.
        dispatch(logout());
    }

    return (
        <div className="logout-container d-flex justify-content-center align-items-center">
            <div className="col-11 col-sm-12">
                <p className="header-logo-quiz text-center mb-3">
                    Logout
                </p>
                <form className="pet-match-quiz mx-auto">
                    <div className="form-group text-center">
                        <label htmlFor="logout-confirmation" className="form-label">
                            Are you sure you want to log out?
                        </label>
                    </div>

                    <div className="form-group">
                        <div className="d-flex justify-content-center mt-2">
                            <Link to={`/Home`} className="btn btn-secondary me-2">
                                Cancel
                            </Link>
                            <Link to={`/Home`} className="btn btn-danger me-2" onClick={handleLogout}>
                                Logout
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Logout;
