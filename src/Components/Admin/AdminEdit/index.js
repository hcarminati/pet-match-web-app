import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../client";
import {setUser} from "../../Profile/userReducer";
import {useParams} from "react-router";
import {updateUserById} from "../client";

function AdminEdit() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const { id } = useParams();
    const [editedUsername, setEditedUsername] = useState(user.username);
    const [editedDescription, setEditedDescription] = useState(user.description);
    const [editedEmail, setEditedEmail] = useState(user.email);
    const [editedPassword, setEditedPassword] = useState(user.password);
    const [success, setSuccess] = useState(null);
    const [userToEdit, setUserToEdit] = useState({});
    const [editedRole, setEditedRole] = useState(user.userType); // Define state for the role

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await client.getUserById(id);
                setUserToEdit(fetchedUser);
                // Set the fetched user data to the state
                setEditedUsername(fetchedUser.username);
                setEditedDescription(fetchedUser.description);
                setEditedEmail(fetchedUser.email);
                setEditedPassword(fetchedUser.password);
                setEditedPassword(fetchedUser.userType);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleUsernameChange = (e) => {
        setEditedUsername(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEditedEmail(e.target.value);
    };
    const handleRoleChange = (e) => {
        setEditedRole(e.target.value);
    };
    const saveChanges = async () => {
        const newUser = {
            ...userToEdit,
            username: editedUsername,
            description: editedDescription,
            email: editedEmail,
            userType: editedRole,
        };
        delete newUser.isLoggedIn;

        const status = await client.updateUserById(userToEdit.id, newUser);
        dispatch(setUser(newUser));
        setSuccess("Profile successfully updated.");

    };

    return (
        <div className="row">

            {/* Main Content */}
            <div className="col-md-9">
                <div className="col-11 col-sm-12">
                    <p className="header-logo-quiz content-center mb-3">Edit {userToEdit.username}'s Profile</p>
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
                        </div>

                        <div className="form-group">
                            <label className="form-label mt-2">User Type</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="adopter"
                                    name="userType"
                                    value="adopter"
                                    checked={editedRole === "adopter"}
                                    onChange={() => setEditedRole("adopter")}
                                    className="form-check-input"
                                />
                                <label htmlFor="adopter" className="form-check-label">
                                    Adopter
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="uploader"
                                    name="userType"
                                    value="uploader"
                                    checked={editedRole === "uploader"}
                                    onChange={() => setEditedRole("uploader")}
                                    className="form-check-input"
                                />
                                <label htmlFor="uploader" className="form-check-label">
                                    Uploader
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="admin"
                                    name="userType"
                                    value="admin"
                                    checked={editedRole === "admin"}
                                    onChange={() => setEditedRole("admin")}
                                    className="form-check-input"
                                />
                                <label htmlFor="admin" className="form-check-label">
                                    Admin
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="float-end mt-3">
                                <Link to="/Admin/users" className="btn btn-secondary mt-2">
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
                        {success && <p className="text-success mt-2">{success}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminEdit;
