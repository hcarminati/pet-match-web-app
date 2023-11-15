import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from "../../userReducer";

function ChangePassword() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newPasswordAgain, setNewPasswordAgain] = useState();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };
    const handleNewPasswordAgainChange = (e) => {
        setNewPasswordAgain(e.target.value);
    };

    const saveChanges = () => {
        if (user.password === oldPassword && newPassword === newPasswordAgain) {
            dispatch(
                setUser({
                            ...user,
                            password: newPassword,
                        })
            );
            setError(null);
            setSuccess("Password successfully changed.");
        }
        else {
            setError("Old password is invalid or new passwords don't match.");
            return;
        }
    };

    return (
        <div className="row">

            {/* Main Content */}
            <div className="col-md-9">
                <div className="col-11 col-sm-12">
                    <p className="header-logo-quiz content-center mb-3">Change Password</p>
                    <form className="pet-match-quiz mx-auto">
                        <div className="form-group">
                            <label htmlFor="old-password" className="form-label">
                                Enter Old Password
                            </label>
                            <input
                                type="password"
                                className="search-bar form-control me-2"
                                id="old-password"
                                placeholder="Enter old password"
                                onChange={(e) => handleOldPasswordChange(e)} // Handle changes to the username
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="new-password" className="form-label">
                                Enter New Password
                            </label>
                            <input
                                type="password"
                                className="search-bar form-control me-2"
                                id="new-password"
                                placeholder="Enter new password"
                                onChange={(e) => handleNewPasswordChange(e)}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="new-password-again" className="form-label">
                                Enter New Password Again
                            </label>
                            <input
                                type="password"
                                className="search-bar form-control me-2"
                                id="new-password-again"
                                placeholder="Enter new password again"
                                onChange={(e) => handleNewPasswordAgainChange(e)}
                            />
                            {error && <p className="text-danger">{error}</p>}
                            {success && <p className="text-success">{success}</p>}
                        </div>

                        <div className="form-group">
                            <div className="float-end mb-2">
                                <Link to="/profile" className="btn btn-secondary mt-2">
                                    Cancel
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-danger ms-2 mt-2"
                                    onClick={saveChanges}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
