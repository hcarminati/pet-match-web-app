import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import {useSelector} from "react-redux";

function AnimalCard({animal}) {
    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
        if (isLoggedIn) {
            setIsLiked(!isLiked);
        }
    };

    const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

    return (
        <div className={"card my-3 mx-3"}>
            <div className="card-img-top">
                <img
                    src={animal.primary_photo_cropped ? animal.primary_photo_cropped.full : ""}
                    alt="Animal Image"
                    className="fill-image"
                />
            </div>

            <div className="vertical-dots">
                <FontAwesomeIcon
                    className={`${isLiked ? 'text-danger' : 'text-white'}`}
                    icon={faHeart}
                    onClick={toggleLike}
                />
            </div>
            <Link
                to={`/Pet/${animal.id}`}
                className="text-decoration-none text-reset"
            >
                <div className="card-body m-0">
                    <h6 className="card-title">{animal.name}</h6>
                    <p className="card-text text-muted">{animal.breeds.primary}</p>
                </div>
            </Link>
        </div>
    );
}

export default AnimalCard;
