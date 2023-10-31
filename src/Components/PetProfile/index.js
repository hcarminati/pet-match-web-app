import React from 'react';
import './index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

const PetProfile = () => {
    return (
        <div className="pet-profile-container">
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            <div className="pet-profile-content">
                    <div className="row">
                        <div className="col-12 col-sm-5 pe-3 ">
                            <h4 >Pet Name</h4>
                            <div className="pet-profile-image mt-3 float-end">
                            </div>
                        </div>
                        <div className="pet-profile-top-info col-12 col-sm-7 ">
                            <p> Age: 10 </p>
                            <p> Species: Dog </p>
                            <p> Breed: Husky </p>
                        </div>
                    </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default PetProfile;
