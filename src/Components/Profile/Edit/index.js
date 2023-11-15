import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../userReducer";

function EditProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const [editedUsername, setEditedUsername] = useState(user.username);
    const [editedDescription, setEditedDescription] = useState(user.description);
    const [editedEmail, setEditedEmail] = useState(user.email);

    const [success, setSuccess] = useState(null);

    const handleUsernameChange = (e) => {
        setEditedUsername(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEditedEmail(e.target.value);
    };
    const saveChanges = () => {
        // Update the Redux store with the edited username
        dispatch(
            setUser({
                        ...user,
                        username: editedUsername,
                        description: editedDescription,
                        email: editedEmail,
                    })
        );
        setSuccess("Profile successfully updated.");
    };

    return (
        <div className="row">

            {/* Main Content */}
            <div className="col-md-9">
                <div className="col-11 col-sm-12">
                    <p className="header-logo-quiz content-center mb-3">Edit Profile</p>
                    <form className="pet-match-quiz mx-auto">
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Display Name
                            </label>
                            <input
                                type="text"
                                className="search-bar form-control me-2"
                                id="username"
                                placeholder="Enter profile name"
                                value={editedUsername} // Bind the input value to the local state
                                onChange={(e) => handleUsernameChange(e)} // Handle changes to the username
                            />
                        </div>

                        {/* Email */}
                        <div className="form-group mt-2">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="search-bar form-control me-2"
                                id="email"
                                placeholder="Enter profile email"
                                value={editedEmail}
                                onChange={(e) => handleEmailChange(e)}
                            />
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
                                value={editedDescription}
                                onChange={(e) => handleDescriptionChange(e)}
                            />
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

export default EditProfile;
