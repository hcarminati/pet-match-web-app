import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSignup() {
        setUsername("");
        setPassword("");
    }

    return (
        <div className="content content-center">
            <div className="col-11 col-sm-12">
                <p className="header-logo-quiz content-center mb-3">Sign Up</p>
                <form className="pet-match-quiz mx-auto">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="search-bar form-control me-2"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label mt-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="search-bar form-control me-2"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <div className="float-end mb-2">
                            <Link
                                to={`/Home`}
                                onClick={handleSignup}
                                className="btn btn-secondary mt-2"
                            >
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
