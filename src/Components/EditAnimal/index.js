import React, {useEffect, useState} from "react";
import "./index.css";
import 'reactjs-popup/dist/index.css';

import * as petClient from "../PetProfile/client";
import {Link} from "react-router-dom";
import {addMedicalRecord, findAllMedicalRecords, findMedicalRecordById} from "../PetProfile/client";

function EditAnimal({ animal }) {
    const [formData, setFormData] = useState(animal);
    const [success, setSuccess] = useState(null);
    const [newRecord, setNewRecord] = useState(false);
    const [medicalRecord, setMedicalRecord] = useState({
                                                           petId: animal._id,
                                                           vaccinationHistory: '',
                                                           medicalConditions: '',
                                                           prescription: '',
                                                           treatmentHistory: '',
                                                       });

    useEffect(() => {
        const newMedicalRecord = async () => {
            const records = await petClient.findAllMedicalRecords();
            const petRecord = await records.filter(r => r.petId === animal._id)
            if (petRecord[0]) {
                setMedicalRecord(petRecord[0]);
            } else {
                setNewRecord(true);
            }
        }

        newMedicalRecord();

    }, []);

    const handleUpdateAnimal = async () => {
        if (newRecord) {
            await petClient.addMedicalRecord(medicalRecord);
            const records = await petClient.findAllMedicalRecords();
            const petRecord = records.filter(r => r.petId === animal._id)
            const newFormData = {
                ...formData,
                medicalRecord: petRecord[0]._id,
            };
            setFormData(newFormData);
        } else {
            await petClient.updateMedicalRecordById(medicalRecord);
        }

        await petClient.updatePetById(formData);
        setSuccess("Pet successfully updated.");
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
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

    return (
        <div className="edit-animal-container p-3">
            <h2>Edit {formData.name}'s Profile</h2>
            <div className="add-pets-container">
                <form>
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

                    {/*Adoption Center*/}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Adoption Center</label>
                        <input
                            type="text"
                            className="form-control"
                            id="adoptionCenter"
                            name="adoptionCenter"
                            value={formData.adoptionCenter}
                            onChange={handleInputChange}
                        />
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
                </form>

                {/*Medical Record*/}
                <form>
                    <div className="mb-3">
                        <h4>Medical Record</h4>
                        <label htmlFor="name" className="form-label">Vaccination History</label>
                        <input
                            type="text"
                            className="form-control"
                            id="medicalRecord-vaccinationHistory"
                            name="medicalRecord-vaccinationHistory"
                            value={medicalRecord?.vaccinationHistory || ''}
                            onChange={(e) => setMedicalRecord({
                                                                  ...medicalRecord,
                                                                  vaccinationHistory: e.target.value,
                                                              })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Medical Conditions</label>
                        <input
                            type="text"
                            className="form-control"
                            id="medicalRecord-vaccinationHistory"
                            name="medicalRecord-vaccinationHistory"
                            value={medicalRecord?.medicalConditions || ''}
                            onChange={(e) => setMedicalRecord({
                                                                  ...medicalRecord,
                                                                  medicalConditions: e.target.value,
                                                              })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Prescription</label>
                        <input
                            type="text"
                            className="form-control"
                            id="medicalRecord-vaccinationHistory"
                            name="medicalRecord-vaccinationHistory"
                            value={medicalRecord?.prescription || ''}
                            onChange={(e) => setMedicalRecord({
                                                                  ...medicalRecord,
                                                                  prescription: e.target.value,
                                                              })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Treatment History</label>
                        <input
                            type="text"
                            className="form-control"
                            id="medicalRecord-vaccinationHistory"
                            name="medicalRecord-vaccinationHistory"
                            value={medicalRecord?.treatmentHistory || ''}
                            onChange={(e) => setMedicalRecord({
                                                                  ...medicalRecord,
                                                                  treatmentHistory: e.target.value,
                                                              })}
                        />
                    </div>
                </form>

                {success && <p className="text-success mt-2">{success}</p>}
                <Link className="btn btn-danger"
                      onClick={handleUpdateAnimal}>
                    Update
                </Link>
            </div>
        </div>
    );
}

export default EditAnimal;
