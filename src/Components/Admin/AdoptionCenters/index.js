import React, { useState } from 'react';
import './index.css';
import * as client from "../client";
import {useEffect} from "react";
import * as profileClient from "../../Profile/client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {addAdoptionCenter, updateAdoptionCenterById} from "../client";

const AdminPage = () => {
    const [allCenters, setAllCenters] = useState([]);
    const [formData, setFormData] = useState({
                                                 name: '',
                                                 address: {
                                                     street: '',
                                                     city: '',
                                                     zipcode: '',
                                                 },
                                                 contactInfo: '',
                                                 centerType: '',
                                                 operatingHours: {
                                                     monday: '',
                                                     tuesday: '',
                                                     wednesday: '',
                                                     thursday: '',
                                                     friday: '',
                                                     saturday: '',
                                                     sunday: '',
                                                 },
                                                 website: '',
                                                 centerDescription: '',
                                             });
    const [showForm, setShowForm] = useState(false);
    const [expandedCenters, setExpandedCenters] = useState([]);
    const [editingCenterId, setEditingCenterId] = useState(null);

    const fetchData = async () => {
        const allCenters = await client.findAllAdoptionCenters();
        setAllCenters(allCenters);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (centerId) => {
        const centerToEdit = allCenters.find((center) => center._id === centerId);
        if (centerToEdit) {
            setFormData(centerToEdit);
            setEditingCenterId(centerId);
            setShowForm(true);
        }
    };

    const handleCancelEdit = () => {
        setEditingCenterId(null);
        setShowForm(false);
        setFormData({
                        name: '',
                        address: {
                            street: '',
                            city: '',
                            zipcode: '',
                        },
                        contactInfo: '',
                        centerType: '',
                        operatingHours: {
                            monday: '',
                            tuesday: '',
                            wednesday: '',
                            thursday: '',
                            friday: '',
                            saturday: '',
                            sunday: '',
                        },
                        website: '',
                        centerDescription: '',
                    });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCenterId) {
                await client.updateAdoptionCenterById(formData._id, formData);
                setEditingCenterId(null);
            } else {
                await client.addAdoptionCenter(formData)
            }
            setFormData({
                            name: '',
                            address: {
                                street: '',
                                city: '',
                                zipcode: '',
                            },
                            contactInfo: '',
                            centerType: '',
                            operatingHours: {
                                monday: '',
                                tuesday: '',
                                wednesday: '',
                                thursday: '',
                                friday: '',
                                saturday: '',
                                sunday: '',
                            },
                            website: '',
                            centerDescription: '',
                        });
            setAllCenters(await client.findAllAdoptionCenters()); // Refresh the list
            setShowForm(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleExpand = (centerId) => {
        if (expandedCenters.includes(centerId)) {
            setExpandedCenters(expandedCenters.filter((id) => id !== centerId));
        } else {
            setExpandedCenters([...expandedCenters, centerId]);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleDelete = async (centerId) => {
        await client.deleteAdoptionCenter(centerId);
        const filteredCenters = allCenters.filter(center => center._id !== centerId);
        setAllCenters(filteredCenters);
    };

    return (
        <div className="admin-container">
            <h2>Adoption Centers</h2>
            <div className="dropdown mb-3">
                <button
                    className="btn btn-primary dropdown-toggle mb-2"
                    type="button"
                    onClick={toggleForm}
                >
                    Click to Add Adoption Center
                </button>
                {showForm && (
                    <div>
                        <form className="admin-form me-4">
                            {/* Name */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input type="text" className="form-control" id="name" name="name" value={formData.name}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           name: e.target.value,
                                                       })} />
                            </div>

                            {/* Address */}
                            <div className="mb-3">
                                <p>Address:</p>
                                <label htmlFor="street" className="form-label">Street</label>
                                <input type="text" className="form-control" id="street" name="address.street" value={formData.address.street}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           address: {
                                                               ...formData.address,
                                                               street: e.target.value
                                                           },
                                                       })}/>
                                {/* Other address fields: city, zipcode */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="street" className="form-label">City</label>
                                <input type="text" className="form-control" id="street" name="address.street" value={formData.address.city}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           address: {
                                                               ...formData.address,
                                                               city: e.target.value
                                                           },
                                                       })}/>
                                {/* Other address fields: city, zipcode */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="street" className="form-label">Zipcode</label>
                                <input type="text" className="form-control" id="street" name="address.street" value={formData.address.zipcode}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           address: {
                                                               ...formData.address,
                                                               zipcode: e.target.value
                                                           },
                                                       })}/>
                                {/* Other address fields: city, zipcode */}
                            </div>

                            {/* Contact Info */}
                            <div className="mb-3">
                                <label htmlFor="contactInfo" className="form-label">Contact Info:</label>
                                <input type="text" className="form-control" id="contactInfo" name="contactInfo" value={formData.contactInfo}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           contactInfo: e.target.value,
                                                       })}
                                />
                            </div>

                            {/* Center Type */}
                            <div className="mb-3">
                                <label htmlFor="centerType" className="form-label">Center Type:</label>
                                <input type="text" className="form-control" id="centerType" name="centerType" value={formData.centerType}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           centerType: e.target.value,
                                                       })}
                                />
                            </div>

                            {/* Operating Hours */}
                            {/* Similar input fields for each day */}
                            <div className="mb-3">
                                <p>Operating Hours:</p>
                                <label htmlFor="centerType" className="form-label">Monday</label>
                                <input type="text" className="form-control" id="centerType" name="centerType" value={formData.operatingHours.monday}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           operatingHours: {
                                                               ...formData.operatingHours,
                                                               monday: e.target.value,
                                                           },
                                                       })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="centerType" className="form-label">Tuesday</label>
                                <input type="text" className="form-control" id="centerType" name="centerType" value={formData.operatingHours.tuesday}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           operatingHours: {
                                                               ...formData.operatingHours,
                                                               tuesday: e.target.value,
                                                           },
                                                       })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="centerType" className="form-label">Wednesday</label>
                                <input type="text" className="form-control" id="centerType" name="centerType" value={formData.operatingHours.wednesday}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           operatingHours: {
                                                               ...formData.operatingHours,
                                                               wednesday: e.target.value,
                                                           },
                                                       })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="centerType" className="form-label">Thursday</label>
                                <input type="text" className="form-control" id="centerType" name="centerType" value={formData.operatingHours.thursday}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           operatingHours: {
                                                               ...formData.operatingHours,
                                                               thursday: e.target.value,
                                                           },
                                                       })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="centerType" className="form-label">Friday</label>
                                <input type="text" className="form-control" id="centerType" name="centerType" value={formData.operatingHours.friday}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           operatingHours: {
                                                               ...formData.operatingHours,
                                                               friday: e.target.value,
                                                           },
                                                       })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="centerType" className="form-label">Saturday</label>
                                <input type="text" className="form-control" id="centerType" name="centerType" value={formData.operatingHours.saturday}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           operatingHours: {
                                                               ...formData.operatingHours,
                                                               saturday: e.target.value,
                                                           },
                                                       })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="centerType" className="form-label">Sunday</label>
                                <input type="text" className="form-control" id="centerType" name="centerType" value={formData.operatingHours.sunday}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           operatingHours: {
                                                               ...formData.operatingHours,
                                                               sunday: e.target.value,
                                                           },
                                                       })}
                                />
                            </div>

                            {/* Website */}
                            <div className="mb-3">
                                <label htmlFor="website" className="form-label">Website:</label>
                                <input type="text" className="form-control" id="website" name="website" value={formData.website}
                                       onChange={(e) =>
                                           setFormData({
                                                           ...formData,
                                                           website: e.target.value,
                                                       })}
                                />
                            </div>

                            {/* Center Description */}
                            <div className="mb-3">
                                <label htmlFor="centerDescription" className="form-label">Center Description:</label>
                                <textarea className="form-control" id="centerDescription" name="centerDescription" value={formData.centerDescription}
                                          onChange={(e) =>
                                              setFormData({
                                                              ...formData,
                                                              centerDescription: e.target.value,
                                                          })}
                                />
                            </div>
                        </form>
                        <button type="submit"
                                className="btn btn-primary mb-4"
                            onClick={handleSubmit}> Add Center</button>
                    </div>
                )}
                <div className="centers-list">
                    {allCenters.map((center, index) => (
                        <div key={index} className="center-card">
                            <Link
                                className="text-black edit-button float-end ms-3"
                                onClick={() => handleEdit(center._id)}
                            >
                                <FontAwesomeIcon icon={faEdit}/>
                            </Link>
                            <Link
                                className="text-black delete-button float-end ms-3"
                                onClick={() => handleDelete(center._id)}
                            >
                                <FontAwesomeIcon icon={faTrash}/>
                            </Link>
                            <Link
                                className="text-black float-end"
                                onClick={() => handleExpand(center._id)}
                            >
                                <FontAwesomeIcon icon={faChevronDown}/>
                            </Link>
                            <h3>{center.name}</h3>
                            <p>{center.address.street}, {center.address.city}, {center.address.zipcode}</p>
                            <p>Contact Info: {center.contactInfo}</p>
                            {expandedCenters.includes(center._id) && (
                                <div className="expanded-details">
                                    <p>Website: {center.website}</p>
                                    <p>Operating Hours:</p>
                                    <ul>
                                        <li>Monday: {center.operatingHours.monday}</li>
                                        <li>Tuesday: {center.operatingHours.tuesday}</li>
                                        <li>Wednesday: {center.operatingHours.wednesday}</li>
                                        <li>Thursday: {center.operatingHours.thursday}</li>
                                        <li>Friday: {center.operatingHours.friday}</li>
                                        <li>Saturday: {center.operatingHours.saturday}</li>
                                        <li>Sunday: {center.operatingHours.sunday}</li>
                                    </ul>
                                </div>
                            )}
                            <p>Center Id: {center._id}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
