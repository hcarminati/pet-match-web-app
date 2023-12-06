import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as client from "../client";
import {useParams} from "react-router";

function AdminEdit() {
    const {id} = useParams();
    const [userToEdit, setUserToEdit] = useState({});

    const [editedUsername, setEditedUsername] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedPassword, setEditedPassword] = useState("");
    const [editedRole, setEditedRole] = useState("");

    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await client.getUserById(id);
                setUserToEdit(fetchedUser);

                setEditedUsername(fetchedUser.username);
                setEditedDescription(fetchedUser.description);
                setEditedEmail(fetchedUser.email);
                setEditedPassword(fetchedUser.password);
                setEditedRole(fetchedUser.role);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handlePasswordChange = (e) => {
        setEditedPassword(e.target.value);
    };
    const handleUsernameChange = (e) => {
        setEditedUsername(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEditedEmail(e.target.value);
    };
    const saveChanges = async () => {
        const newUser = {
            ...userToEdit,
            username: editedUsername,
            password: editedPassword,
            description: editedDescription,
            email: editedEmail,
            role: editedRole
        };
        delete newUser.isLoggedIn;

        console.log(newUser)

        await client.updateUserById(newUser);
        setSuccess("Profile successfully updated.");
    };
    const handleDeleteUser = async () => {
        try {
            await client.deleteUser(id);
            // window.location.pathname = "/Admin/users";
            setSuccess("Account successfully deleted.");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="row">

            {/* Main Content */}
            <div className="col-md-9">
                <div className="col-11 col-sm-12">
                    <p className="header-logo-quiz content-center mb-3">Edit {userToEdit.username}'s
                        Profile</p>
                    <form className="pet-match-quiz mx-auto">
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="search-bar form-control me-2"
                                id="username"
                                placeholder="Enter profile name"
                                value={editedUsername} // Bind the input value to the local state
                                onChange={(e) => handleUsernameChange(
                                    e)} // Handle changes to the username
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="text"
                                className="search-bar form-control me-2"
                                id="password"
                                placeholder="Enter profile name"
                                value={editedPassword}
                                onChange={(e) => handlePasswordChange(
                                    e)}
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
                                    name="role"
                                    value="adopter"
                                    checked={editedRole === "ADOPTER"}
                                    onChange={() => setEditedRole("ADOPTER")}
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
                                    name="role"
                                    value="uploader"
                                    checked={editedRole === "UPLOADER"}
                                    onChange={() => setEditedRole("UPLOADER")}
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
                                    name="role"
                                    value="admin"
                                    checked={editedRole === "ADMIN"}
                                    onChange={() => setEditedRole("ADMIN")}
                                    className="form-check-input"
                                />
                                <label htmlFor="admin" className="form-check-label">
                                    Admin
                                </label>
                            </div>
                            {success && <p className="text-success mt-2">{success}</p>}
                        </div>

                        <div className="form-group">
                            <div className="float-end">
                                <Link onClick={() => handleDeleteUser()}
                                      className="btn btn-warning mt-2">
                                    Delete Profile
                                </Link>
                                <Link to="/Admin/users" className="btn btn-secondary ms-2 mt-2">
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

export default AdminEdit;
