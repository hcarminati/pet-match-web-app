import React from "react";
import {Link} from "react-router-dom";
import db from "../Database";
import {faEllipsisV, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Dashboard() {
    return (
        <div>
            <div className="title-content">
                <h3 className="d-none d-sm-block mt-2 mb-0">Dashboard</h3>
                <div className="d-flex flex-row align-items-center justify-content-end">
                    <FontAwesomeIcon className="mt-3 d-block d-sm-none" icon={faEllipsisV}/>
                </div>
                <hr/>
            </div>

            <div className="courses-content">
                <h4>Published Courses ({db.courses.length})</h4>
                <hr/>
                <div className="list-group d-flex flex-row flex-wrap">
                    {db.courses.map((course) => (
                        <div className="card my-3 mx-3">
                            <div className="card-img-top"></div>
                            <div className="vertical-dots">
                                <FontAwesomeIcon className="text-white" icon={faEllipsisV}/>
                            </div>
                            <Link
                                key={course._id}
                                to={`/Kanbas/Courses/${course._id}`}
                                className="text-decoration-none text-reset"
                            >
                                <div className="card-body m-0">
                                    <h6 className="card-title">{course.name}</h6>
                                    <p className="card-text text-muted">
                                        {course.number}.{course._id}
                                    </p>
                                    <p className="card-text text-muted">
                                        {course.startDate}
                                    </p>
                                    <FontAwesomeIcon
                                        className="text-muted mt-2"
                                        icon={faPenToSquare}
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
