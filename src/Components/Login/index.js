import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { login } from "../Profile/userReducer";
import { useDispatch } from "react-redux";

function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    function handleLogin(e) {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill in all required fields.");
            return;
        }

        const userData = {
            username, // Capture the username and password from the input fields
            password, // Set the user type based on your logic
        };

        // Dispatch the login action with the user data
        dispatch(login(userData));
    }

    return (
        <div className="content content-center">
            <div className="col-11 col-sm-12">
                <p className="header-logo-quiz content-center mb-3">Login</p>
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
                    {error && <p className="text-danger">{error}</p>}
                    <div className="form-group">
                        <div className="float-end mb-2">
                            <Link to={`/Home`} onClick={(e) => handleLogin(e)} className="btn btn-secondary mt-2">
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
