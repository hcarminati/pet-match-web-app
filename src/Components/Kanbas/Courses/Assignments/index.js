import React from "react";
import {Link, useParams} from "react-router-dom";
import db from "../../Database";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faCheck,
    faCircleCheck,
    faEllipsisV,
    faGripVertical,
    faPenToSquare,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import './index.css';

function Assignments() {
    const {courseId} = useParams();
    const assignments = db.assignments;
    const courseAssignments = assignments.filter(
        (assignment) => assignment.course === courseId
    );
    return (
        <div>
            <div className="title-content">
                <div className="d-flex align-items-center">
                    <input
                        type="search"
                        className="search-bar form-control me-2"
                        id="search"
                        placeholder="Search for Assignment"
                    ></input>
                    <a className="btn btn-danger me-2" role="button">
                        <FontAwesomeIcon className="me-1" icon={faPlus}/>
                        Assignment
                    </a>
                    <a className="btn btn-secondary me-2" role="button">
                        <FontAwesomeIcon className="me-1" icon={faPlus}/>
                        Group
                    </a>
                    <a className="btn btn-secondary" role="button">
                        <FontAwesomeIcon icon={faEllipsisV}/>
                    </a>
                </div>
                <hr className="modules-hr"/>
            </div>
            <div className="list-group">
                <Link
                    className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center"
                >
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon
                            className="me-2"
                            icon={faGripVertical}
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                        <h6 class="ms-2 mt-3">ASSIGNMENTS</h6>
                    </div>
                    <div class="d-flex align-items-center">
                        <p class="percent-total float-end me-2 mt-3 rounded-pill">
                            40% of Total
                        </p>
                        <FontAwesomeIcon
                            className="me-2 float-end"
                            icon={faPlus}
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon
                            className="text-secondary"
                            icon={faEllipsisV}
                        ></FontAwesomeIcon>
                    </div>
                </Link>
                {courseAssignments.map((assignment) => (
                    <Link
                        key={assignment._id}
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                        className="list-group-item"
                    >
                        <div className="row mt-2">
                            <div className="col-2">
                                <FontAwesomeIcon
                                    className="me-2"
                                    icon={faGripVertical}
                                ></FontAwesomeIcon>
                                <FontAwesomeIcon
                                    className="text-success"
                                    icon={faPenToSquare}
                                ></FontAwesomeIcon>
                            </div>
                            <div className="col-8">
                                <h6> {assignment.title}</h6>
                                <div className="d-flex align-items-center">
                                    <p className="text-danger">Multiple Modules</p>
                                    <p className="mx-2">|</p>
                                    <p className="fw-bold me-2">Due</p>
                                    <p>{assignment.due} | 100pts</p>
                                </div>
                            </div>
                            <div className="col-2">
                                <FontAwesomeIcon
                                    className="text-secondary float-end"
                                    icon={faEllipsisV}
                                ></FontAwesomeIcon>
                                <FontAwesomeIcon
                                    className="text-success me-2 float-end"
                                    icon={faCircleCheck}
                                ></FontAwesomeIcon>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Assignments;
