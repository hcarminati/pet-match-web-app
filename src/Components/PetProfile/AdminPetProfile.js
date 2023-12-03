import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getAnimalById} from "../../api/petfinder-api";
import * as client from "../AnimalCard/client";
import {useSelector} from "react-redux";

const AdminPetProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = useSelector(state => state.userReducer);

    const [petData, setPetData] = useState(null);


    useEffect(() => {
        const fetchAnimalInfoAndLog = async () => {
            try {
                const animalInfo = await getAnimalById(id);
                console.log(animalInfo);
                setPetData(animalInfo);
            } catch (error) {
                console.error('Error fetching animal information:', error);
            }
        };

        fetchAnimalInfoAndLog(id);
    }, [id]);

    if (!petData) {
        return <div>No data...</div>;
    }

    const addPet = async () => {
        const newAnimal = {
            originalId: petData.id,
            name: petData.name,
            age: petData.age,
            attributes: petData.attributes,
            breeds: petData.breeds,
            coat: petData.coat,
            gender: petData.gender,
            size: petData.size,
            colors: petData.colors,
            description: petData.description,
            status: "adoptable",
            primary_photo_cropped: petData.primary_photo_cropped,
            photos: petData.photos,
            published_at: petData.published_at,
            tags: petData.tags,
            type: petData.type,
            uploader: user._id,
        }

        await client.addPet(newAnimal).then(
            navigate(-1)
        );

    }

    return (
        <div>
            <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)}></FontAwesomeIcon>
            <div className="pet-profile-content">
                <div className="row">
                    <div className="col-12 col-sm-7 col-md-6 pe-3">
                        <h2>{petData.name}</h2>
                        <div className="pet-profile-image mt-3 float-end">
                            <img
                                src={petData.primary_photo_cropped ? petData.primary_photo_cropped.full : ""}
                                alt={petData.name}
                                className="fill-profile-image"
                            />
                        </div>
                    </div>
                    <div className="pet-profile-top-info col-12 col-sm-6 col-md-6">
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

                        <Link className="btn btn-danger mt-3" onClick={addPet}>
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Add this pet
                        </Link>
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
            </div>
        </div>
    );
}

export default AdminPetProfile;
