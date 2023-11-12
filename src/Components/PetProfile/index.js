import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import { getAnimalById } from '../../api/petfinder-api';

const PetProfile = () => {
    const { id } = useParams();
    const [petData, setPetData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        getAnimalById(id)
            .then(data => {
                setPetData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const addComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    if (!petData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pet-profile-container">
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
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
                        <p><strong>Age:</strong> {petData.age}</p>
                        <p><strong>Species:</strong> {petData.species}</p>
                        <p><strong>Breed:</strong> {petData.breeds.primary}</p>

                        <div className="d-flex flex-wrap">
                            {petData.tags.map((tag, index) => (
                                <span key={index} className="badge bg-secondary me-2 mb-2">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <h5>Description</h5>
                        <p>{petData.description}</p>
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

                {/* Comment section */}
                <div className="row mt-4">
                    <div className="col-12">
                        <h5>Comments</h5>
                        <textarea
                            rows="4"
                            className="form-control mb-2"
                            placeholder="Add a comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={addComment}>Add Comment</button>
                        <ul>
                            {comments.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PetProfile;
