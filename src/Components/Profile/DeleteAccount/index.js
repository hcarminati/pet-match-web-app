import {Link, useParams} from "react-router-dom";
import React from "react";
import * as loginClient from "../../Login/client";
import * as adminClient from "../../Admin/client";
import {useEffect, useState} from "react";
import * as profileClient from "../client";

function Delete() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await profileClient.getAccount();
                setUser(userData);
            } catch (error) {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    const handleDelete = async () => {
        try {
            await adminClient.deleteUser(user._id);
            await loginClient.logout(user._id);
            // window.location.pathname = "/Admin/users";
        } catch (err) {
            console.log(err);
        }
    };



    return (
        <div className="logout-container d-flex justify-content-center align-items-center">
            <div className="col-11 col-sm-12">
                <p className="header-logo-quiz text-center mb-3">
                    Delete Account
                </p>
                <form className="pet-match-quiz mx-auto">
                    <div className="form-group text-center">
                        <label htmlFor="logout-confirmation" className="form-label">
                            Are you sure you want to delete your account?
                        </label>
                    </div>

                    <div className="form-group">
                        <div className="d-flex justify-content-center mt-2">
                            <Link to={`/Home`} className="btn btn-secondary me-2">
                                Cancel
                            </Link>
                            <Link
                                to={`/Home`}
                                className="btn btn-danger me-2"
                                onClick={handleDelete}>
                                Delete
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Delete;

