import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function AnimalCard() {
    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className={"card my-3 mx-3"}>
            <div className="card-img-top"></div>
            <div className="vertical-dots">
                <FontAwesomeIcon
                    className={`${isLiked ? 'text-danger' : 'text-white'}`}
                    icon={faHeart}
                    onClick={toggleLike}
                />
            </div>
            <Link
                // key={"pet"}
                to={`/Pet`}
                className="text-decoration-none text-reset"
            >
                <div className="card-body m-0">
                    <h6 className="card-title">Pet Name</h6>
                    <p className="card-text text-muted">Breed</p>
                </div>
            </Link>
        </div>
    );
}

export default AnimalCard;
