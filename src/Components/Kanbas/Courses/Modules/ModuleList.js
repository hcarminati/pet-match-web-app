import React from "react";
import {useParams} from "react-router-dom";
import db from "../../Database";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCaretDown, faCaretRight,
    faCircleCheck, faEllipsisV,
    faGripVertical,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import "./ModuleList.css";

function ModuleList() {
    const {courseId} = useParams();
    const modules = db.modules.filter(
        (module) => module.course === courseId);
    return (
        <ul className="list-group">
            {modules.map((module, index) => (
                <li key={index} className="list-group-item list-group-item-secondary mb-4">
                    <div
                        className="d-flex align-items-center justify-content-between mt-2">
                        <div className="list-header-content d-flex align-items-center mb-2">
                            <FontAwesomeIcon className="me-2"
                                             icon={faGripVertical}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
                            <h5 className="list-header m-0 ms-2">{module.name}</h5>
                        </div>
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon className="text-success me-2"
                                             icon={faCircleCheck}></FontAwesomeIcon>
                            <FontAwesomeIcon className="me-3" icon={faCaretDown}></FontAwesomeIcon>
                            <FontAwesomeIcon className="me-2" icon={faPlus}></FontAwesomeIcon>
                            <FontAwesomeIcon className="text-secondary"
                                             icon={faEllipsisV}></FontAwesomeIcon>
                        </div>
                    </div>
                    <p>{module.description}</p>
                </li>
            ))
            }
        </ul>
    );
}

export default ModuleList;