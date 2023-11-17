import React, { useState, useEffect } from 'react';
import './index.css';
import * as client from "../client";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await client.getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
                                           (user.username.toLowerCase().includes(searchTerm.toLowerCase())
                                            || searchTerm === "") &&
                                           (roleFilter === "all" || user.userType === roleFilter)
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleRoleFilterChange = (e) => {
        setRoleFilter(e.target.value);
    };

    return (
        <div className="users-container">
            <h2>Users</h2>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select
                    className="form-select"
                    value={roleFilter}
                    onChange={handleRoleFilterChange}
                >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="adopter">Adopter</option>
                    <option value="uploader">Uploader</option>
                </select>
            </div>
            <ul>
                {filteredUsers.map(user => (
                    <div key={user.id} className="user-item">
                        <Link to={`${user.id}`} className="text-decoration-none text-black ps-2">
                            {user.username}
                        </Link>
                        <span key="admin-badge" className={`badge badge-pill ms-2 me-2 ${
                            user.userType === "admin" ? "bg-danger" :
                            user.userType === "adopter" ? "bg-success" :
                            user.userType === "uploader" ? "bg-primary" :
                            "bg-secondary"
                        } badge-xs`}>
                            {user.userType}
                        </span>
                        <Link to={`edit/${user.id}`}>
                            <FontAwesomeIcon icon={faEdit} className="text-muted" />
                        </Link>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Users;
