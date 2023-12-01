import React, { useState } from 'react';
import './index.css';
import * as animalCardClient from "../../AnimalCard/client";
import {useEffect} from "react";
import * as profileClient from "../../Profile/client";

const NewPet = () => {
    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
                                                 age: '',
                                                 name: '',
                                                 attributes: {
                                                     declawed: false,
                                                     house_trained: false,
                                                     shots_current: false,
                                                     spayed_neutered: false,
                                                     special_needs: false,
                                                 },
                                                 breeds: {
                                                     primary: '',
                                                     secondary: '',
                                                     mixed: false,
                                                     unknown: false,
                                                 },
                                                 coat: '',
                                                 gender: '',
                                                 size: '',
                                                 colors: {
                                                     primary: '',
                                                     secondary: '',
                                                     tertiary: '',
                                                 },
                                                 description: '',
                                                 status: '',
                                                 primary_photo_cropped: {
                                                     full: '',
                                                     large: '',
                                                     medium: '',
                                                     small: '',
                                                 },
                                                 photos: [],
                                                 published_at: '',
                                                 tags: [],
                                                 type: '',
                                                 uploader: '',
                                             });

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await profileClient.getAccount();
            setUser(userData);
            const newFormData = {
                ...formData,
                uploader: userData._id,
            };
            setFormData(newFormData)
        };

        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Handle checkbox inputs
            if (name.includes('.')) {
                const [parent, child] = name.split('.');
                setFormData({
                                ...formData,
                                [parent]: {
                                    ...formData[parent],
                                    [child]: value
                                }
                            });
            } else {
                // Convert the comma-separated tags into an array
                if (name === 'tags') {
                    const tagsArray = value.split(',').map(tag => tag.trim());
                    setFormData({
                                    ...formData,
                                    [name]: tagsArray
                                });
                } else {
                    setFormData({
                                    ...formData,
                                    [name]: value
                                });
                }
            }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await animalCardClient.addPet(formData);
        } catch (error) {
            console.error('Error adding new pet:', error);
        }
    };

    return (
        <div className="add-pets-container">
            <h2>Add a New Pet</h2>
            <form onSubmit={handleSubmit}>
                {/*Name*/}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>

                {/*Age*/}
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="text"
                        className="form-control"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                    />
                </div>

                {/*Attributes*/}
                <div className="mb-3">
                    <label>Attributes:</label>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="declawed"
                            name="attributes.declawed"
                            checked={formData.attributes.declawed}
                            onChange={(e) => setFormData({
                                                             ...formData,
                                                             attributes: {
                                                                 ...formData.attributes,
                                                                 declawed: e.target.checked
                                                             }
                                                         })}
                        />
                        <label className="form-check-label" htmlFor="declawed">Declawed</label>
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="house_trained"
                            name="attributes.house_trained"
                            checked={formData.attributes.house_trained}
                            onChange={(e) => setFormData({
                                                             ...formData,
                                                             attributes: {
                                                                 ...formData.attributes,
                                                                 house_trained: e.target.checked
                                                             }
                                                         })}
                        />
                        <label className="form-check-label" htmlFor="house_trained">House Trained</label>
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="shots_current"
                            name="attributes.shots_current"
                            checked={formData.attributes.shots_current}
                            onChange={(e) => setFormData({
                                                             ...formData,
                                                             attributes: {
                                                                 ...formData.attributes,
                                                                 shots_current: e.target.checked
                                                             }
                                                         })}
                        />
                        <label className="form-check-label" htmlFor="shots_current">Shots Current</label>
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="spayed_neutered"
                            name="attributes.spayed_neutered"
                            checked={formData.attributes.spayed_neutered}
                            onChange={(e) => setFormData({
                                                             ...formData,
                                                             attributes: {
                                                                 ...formData.attributes,
                                                                 spayed_neutered: e.target.checked
                                                             }
                                                         })}
                        />
                        <label className="form-check-label" htmlFor="spayed_neutered">Spayed Neutered</label>
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="special_needs"
                            name="attributes.special_needs"
                            checked={formData.attributes.special_needs}
                            onChange={(e) => setFormData({
                                                             ...formData,
                                                             attributes: {
                                                                 ...formData.attributes,
                                                                 special_needs: e.target.checked
                                                             }
                                                         })}
                        />
                        <label className="form-check-label" htmlFor="special_needs">Special Needs</label>
                    </div>
                </div>

                {/*Breeds*/}
                <div className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="primary">Primary Breed</label>
                        <input
                            type="text"
                            className="form-control"
                            id="primary"
                            name="breeds.primary"
                            value={formData.breeds.primary}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="secondary">Secondary Breed</label>
                        <input
                            type="text"
                            className="form-control"
                            id="secondary"
                            name="breeds.secondary"
                            value={formData.breeds.secondary}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="mixed"
                            name="breeds.mixed"
                            checked={formData.breeds.mixed}
                            onChange={(e) => setFormData({
                                                             ...formData,
                                                             breeds: {
                                                                 ...formData.breeds,
                                                                 mixed: e.target.checked
                                                             }
                                                         })}
                        />
                        <label className="form-check-label" htmlFor="mixed">Mixed</label>
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="unknown"
                            name="breeds.unknown"
                            checked={formData.breeds.unknown}
                            onChange={(e) => setFormData({
                                                             ...formData,
                                                             breeds: {
                                                                 ...formData.breeds,
                                                                 unknown: e.target.checked
                                                             }
                                                         })}
                        />
                        <label className="form-check-label" htmlFor="unknown">Unknown</label>
                    </div>

                </div>

                {/*Coat*/}
                <div className="mb-3">
                    <label htmlFor="coat" className="form-label">Coat</label>
                    <input
                        type="text"
                        className="form-control"
                        id="coat"
                        name="coat"
                        value={formData.coat}
                        onChange={handleInputChange}
                    />
                </div>

                {/*Gender*/}
                <div className="mb-3">
                    <label htmlFor="gender">Gender</label>
                    <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>

                {/*Size*/}
                <div className="mb-3">
                    <label htmlFor="size">Size</label>
                    <select
                        className="form-select"
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                    >
                        <option value="">Select size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="xlarge">X-Large</option>
                    </select>
                </div>

                {/*Colors*/}
                <div className="mb-3">
                    <label htmlFor="primaryColor">Primary Color</label>
                    <input
                        type="text"
                        className="form-control"
                        id="primaryColor"
                        name="colors.primary"
                        value={formData.colors.primary}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="secondaryColor">Secondary Color</label>
                    <input
                        type="text"
                        className="form-control"
                        id="secondaryColor"
                        name="colors.secondary"
                        value={formData.colors.secondary}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tertiaryColor">Tertiary Color</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tertiaryColor"
                        name="colors.tertiary"
                        value={formData.colors.tertiary}
                        onChange={handleInputChange}
                    />
                </div>

                {/*Description*/}
                <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                {/*Status*/}
                <div className="mb-3">
                    <label htmlFor="status">Status</label>
                    <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Status</option>
                        <option value="available">Available</option>
                        <option value="adopted">Adopted</option>
                    </select>
                </div>

                {/*Primary photo cropped*/}
                {/*Photos*/}
                {/*Published at*/}
                {/*Tags*/}
                <div className="mb-3">
                    <label htmlFor="tags">Tags (comma-separated)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        placeholder="Enter tags separated by commas"
                    />
                </div>

                {/*Type*/}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default NewPet;
