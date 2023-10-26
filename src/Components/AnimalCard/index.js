import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function AnimalCard() {
    return (
        <div className="card my-3 mx-3">
            <div className="card-img-top"></div>
            <div className="vertical-dots">
                <FontAwesomeIcon className="text-white" icon={faHeart}/>
            </div>
            <Link
                // key={course._id}
                // to={`/Kanbas/Courses/${course._id}`}
                className="text-decoration-none text-reset"
            >
                <div className="card-body m-0">
                    {/*<h6 className="card-title">{course.name}</h6>*/}
                    <h6 className="card-title">Pet Name</h6>
                    <p className="card-text text-muted">
                        {/*{course.number}.{course._id}*/}
                        Lorem ipsum dolor sit amet, consectetur adipiscing...
                    </p>
                    <p className="card-text text-muted mt-1">
                        {/*{course.startDate}*/}
                        Birthdate
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default AnimalCard;