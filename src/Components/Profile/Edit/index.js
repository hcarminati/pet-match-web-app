import React, {useState} from "react";
import {Link} from "react-router-dom";
import * as client from "./client";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../userReducer";
import {format, parse} from "date-fns";

function EditProfile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);
    const initialDate = user.dob ? user.dob.split('T')[0] : '';
    const [editedUser, setEditedUser] = useState({
                                                     ...user,
                                                     dob: initialDate,
                                                 });
    const [success, setSuccess] = useState(null);

    const saveChanges = async () => {
        console.log(editedUser.dob)
        if(editedUser.dob) {
            const dobDate = parse(editedUser.dob, 'yyyy-MM-dd', new Date());
            const formattedDateOfBirth = format(dobDate, 'yyyy-MM-dd');
            setEditedUser({
                              ...editedUser,
                              dob: formattedDateOfBirth
                          });

        }
        await client.updateProfile(editedUser);
        dispatch(setUser(editedUser));
        setSuccess('Profile successfully updated.');
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const formattedDate = selectedDate.split('T')[0];
        setEditedUser({
                          ...editedUser,
                          dob: formattedDate
                      });
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
                                value={editedUser.username}
                                onChange={(e) => setEditedUser({
                                                                   ...editedUser,
                                                                   username: e.target.value
                                                               })}
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
                                value={editedUser.email}
                                onChange={(e) => setEditedUser({
                                                                   ...editedUser,
                                                                   email: e.target.value
                                                               })}
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
                                value={editedUser.description}
                                onChange={(e) => setEditedUser({
                                                                   ...editedUser,
                                                                   description: e.target.value
                                                               })}
                            />

                            {/* Date of Birth */}
                            <div className="form-group mt-2">
                                <label htmlFor="dateOfBirth" className="form-label">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    className="search-bar form-control me-2"
                                    id="dateOfBirth"
                                    placeholder="Enter date of birth"
                                    value={editedUser.dob}
                                    onChange={handleDateChange}
                                />
                            </div>
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
