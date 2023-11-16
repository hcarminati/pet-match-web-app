import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import {login, setUser} from "../Profile/userReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as client from "./client";
import {getByUsername} from "./client";

function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill in all required fields.");
            return;
        }
        client.checkCredentials(username, password)
            .then(async (userData) => {
                dispatch({type: "LOGIN_SUCCESS", payload: userData});
                setLoggedIn(true);
                const user = await getByUsername(username);
                dispatch(setUser(user));
                dispatch(login(user));
            })
            .catch((err) => {
                setError("Invalid username or password. Please try again.");
            });
    }

    return (
        <div className="content content-center">
            <div className="col-11 col-sm-12">
                <p className="header-logo-quiz content-center mb-3">Login</p>
                {loggedIn ? (
                    <div>
                        <p className="text-success">Login successful!</p>
                        <p>You are now logged in.</p>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
}

export default Login;
