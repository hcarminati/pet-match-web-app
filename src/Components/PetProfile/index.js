import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronLeft, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as client from "./client";
import * as animalClient from "../AnimalCard/client";
import * as adminClient from "../Admin/client";
import {deleteComment, findCommentsByPetId, findMedicalRecordById} from "./client";
import CommentComponent from "../Comments";
import {useSelector} from "react-redux";

const PetProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = useSelector(state => state.userReducer);

    const [petData, setPetData] = useState(null);
    const [adoptionCenter, setAdoptionCenter] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
                                                     userId: "",
                                                     username: "",
                                                     petId: id,
                                                     date: Date(),
                                                     comment: "",
                                                 });
    const [isAdopted, setIsAdopted] = useState(false);
    const [expandedCenter, setExpandedCenter] = useState(false);
    const [medicalRecord, setMedicalRecord] = useState();

    useEffect(() => {
        const getComments = async () => {
            const comments = await findCommentsByPetId(id);
            setComments(comments);
        }
        const getAdoptionCenter = async (data) => {
            const center = await adminClient.findAdoptionCenterById(data.adoptionCenter);
            setAdoptionCenter(center);
        }
        const getMedicalRecord = async (data, id) => {
            if(data.medicalRecord) {
                const record = await client.findMedicalRecordById(id);
                setMedicalRecord(record);
            }
        }

        animalClient.findPetById(id).then(data => {
            setPetData(data);
            getAdoptionCenter(data);
            getMedicalRecord(data, data.medicalRecord)
        }).catch(error => {
            console.error(error);
        });

        getComments();
    }, [id]);

    const addComment = async () => {
        if (newComment.comment.trim() !== '') {
            const comment = {
                              userId: user._id,
                              username: user.username,
                              petId: newComment.petId,
                              date: Date(),
                              comment: newComment.comment,
                          };
            client.addComment(id, comment).then(() => {
                setComments([
                                ...comments,
                                comment
                ]);
                setNewComment({
                                  userId: "",
                                  username: "",
                                  petId: id,
                                  date: Date(),
                                  comment: "",
                              });
            });
        }
    };

    const handleDeleteComment = async (commentId) => {
        await deleteComment(commentId);
    }

    if (!petData) {
        return <div>Loading...</div>;
    }

    const handleAdoptPet = async () => {
        let pet = await animalClient.findPetById(petData._id);
        const adoptedPet = {
            userId: user._id,
            username: user.username,
            petId: pet._id,
            date: Date(),
        };

        const updatedPet = {
            ...pet,
            status: "adopted"
        };

        setPetData({
                       ...petData,
                       status: 'Adopted',
                   });

        await client.updatePetById(updatedPet);
        await client.addAdoptedPet(id, adoptedPet);
        setIsAdopted(true);
    }


    const handleExpand = () => {
        setExpandedCenter(!expandedCenter);
    };

    return (
        <div className="pet-profile-container">
            <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)}></FontAwesomeIcon>
            <div className="pet-profile-content">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 pe-3">
                        <h2>{petData.name}</h2>
                        <div className="pet-profile-image mt-3 float-end">
                            <img
                                src={petData.primary_photo_cropped ? petData.primary_photo_cropped.full : ""}
                                alt={petData.name}
                                className="fill-profile-image"
                            />
                        </div>
                    </div>
                    <div className="pet-profile-top-info col-12 col-sm-4 col-md-6">
                        <span className="badge bg-danger me-2 mb-2">
                            {petData.status === "adoptable" ? "Adoptable" : "Adopted"}</span>
                        <p><strong>Age:</strong> {petData.age}</p>
                        <p><strong>Species:</strong> {petData.species}</p>
                        <p><strong>Breed:</strong> {petData.breeds.primary}</p>

                        <div className="d-flex flex-wrap">
                            {petData.tags.map((tag, index) => (
                                <span key={index} className="badge bg-secondary me-2 mb-2">{tag}</span>
                            ))}
                        </div>

                        {user.role === 'ADOPTER' && petData.status === 'adoptable' && !isAdopted ? (
                            <button className="btn btn-info mt-2">
                                <Link
                                    className="text-decoration-none text-black"
                                    onClick={handleAdoptPet}
                                >
                                    Adopt
                                </Link>
                            </button>
                        ) : (
                             <></>
                         )}
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <h5>Description</h5>
                        <p>{petData.description}</p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <h5>Medical Record</h5>
                        {medicalRecord ? <ul>
                            <li><strong>Vaccination
                                History:</strong> {medicalRecord.vaccinationHistory}</li>
                            <li><strong>Medical
                                Conditions:</strong> {medicalRecord.medicalConditions}</li>
                            <li><strong>Prescription:</strong> {medicalRecord.prescription}</li>
                            <li><strong>Treatment History:</strong> {medicalRecord.treatmentHistory}
                            </li>
                        </ul> : <p>None.</p>}
                    </div>
                </div>
                <div className="row mt-3">
                    {/* Additional information section */}
                    <div className="col-12">
                        <h5>Additional Information</h5>
                        <ul>
                            {/*<li><strong>Attributes:</strong> {petData.attributes.join(', ')}</li>*/}
                            <li><strong>Coat:</strong> {petData.coat}</li>
                            <li><strong>Gender:</strong> {petData.gender}</li>
                            <li><strong>Size:</strong> {petData.size}</li>
                            <li><strong>Status:</strong> {petData.status}</li>
                            <li><strong>Type:</strong> {petData.type}</li>
                        </ul>
                    </div>
                </div>
                    <div>
                        <div className="row mt-3">
                            {adoptionCenter && (
                                <div className="row mt-3">
                                    {adoptionCenter.name && (
                                        <div className="d-flex justify-content-between w-100">
                                            <h5>{adoptionCenter.name}</h5>
                                            <Link
                                                className="text-black float-end"
                                                onClick={() => handleExpand()}
                                            >
                                                <FontAwesomeIcon icon={faChevronDown} />
                                            </Link>
                                        </div>
                                    )}
                                    <p>{adoptionCenter.address && adoptionCenter.address.street ? adoptionCenter.address.street : ''},
                                        {adoptionCenter.address && adoptionCenter.address.city ? adoptionCenter.address.city : ''},
                                        {adoptionCenter.address && adoptionCenter.address.zipcode ? adoptionCenter.address.zipcode : ''}</p>
                                    <p>Contact Info: {adoptionCenter.contactInfo ? adoptionCenter.contactInfo : ''}</p>
                                    {expandedCenter && <div className="expanded-details">
                                        <p>Website: {adoptionCenter.website ? adoptionCenter.website : ''}</p>
                                        <p>Operating Hours:</p>
                                        <ul>
                                            <li>Monday: {adoptionCenter.operatingHours ? adoptionCenter.operatingHours.monday : ''}</li>
                                            <li>Tuesday: {adoptionCenter.operatingHours ? adoptionCenter.operatingHours.tuesday : ''}</li>
                                            <li>Wednesday: {adoptionCenter.operatingHours ? adoptionCenter.operatingHours.wednesday : ''}</li>
                                            <li>Thursday: {adoptionCenter.operatingHours ? adoptionCenter.operatingHours.thursday : ''}</li>
                                            <li>Friday: {adoptionCenter.operatingHours ? adoptionCenter.operatingHours.friday : ''}</li>
                                            <li>Saturday: {adoptionCenter.operatingHours ? adoptionCenter.operatingHours.saturday : ''}</li>
                                            <li>Sunday: {adoptionCenter.operatingHours ? adoptionCenter.operatingHours.sunday : ''}</li>
                                            {/* Similarly check other days */}
                                        </ul>
                                    </div> }
                                </div>
                            )}
                        </div>
                    </div>

                 {/*Comment section*/}
                <div className="row mt-4">
                    <div className="col-12">
                        <h5>Comments</h5>
                        {user.role != "GUEST" ?
                        <div>
                            <textarea
                                rows="4"
                                className="form-control mb-2"
                                placeholder="Add a comment"
                                value={newComment.comment}
                                onChange={(e) => setNewComment({
                                                                   ...newComment,
                                                                   comment: e.target.value})}
                            />
                            <button className="btn btn-primary" onClick={addComment}>Add Comment</button>
                        </div>
                                                     : <></>}
                        <CommentComponent user={user} comments={comments} handleDeleteComment={handleDeleteComment}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PetProfile;
