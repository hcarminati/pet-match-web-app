import ModuleList from "./ModuleList";
import React from "react";
import './index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEllipsisV, faPlus} from "@fortawesome/free-solid-svg-icons";

function Modules() {
    return (
        <div className="modules">
            <div className="title-content">
                <div>
                    <a className="btn btn-secondary float-end ms-1"
                       role="button">
                        <FontAwesomeIcon icon={faEllipsisV}/>
                    </a>
                    <a className="btn btn-danger float-end mb-2 ms-1"
                       role="button">
                        <FontAwesomeIcon className="me-1" icon={faPlus}/>
                        Module
                    </a>
                    <select className="publish-all-select form-select float-end mb-2 ms-1">
                        <option selected value="PUBLISHALL">
                            <FontAwesomeIcon icon={faCheck}/>
                            Publish All
                        </option>
                        <option value="PUBLISHALLMODULESITEMS">Publish All modules and
                            items
                        </option>
                        <option value="PUBLISHMODULESONLY">Publish modules only</option>
                        <option value="UNPUBLISHALL">UnPublish All</option>
                    </select>
                    <a
                        className="btn btn-secondary float-end mb-2 ms-1"
                        role="button"
                    >
                        View Progress
                    </a>
                    <a
                        className="btn btn-secondary float-end mb-2"
                        role="button"
                    >
                        Collapse All
                    </a>
                </div>
                <hr className="modules-hr"/>
            </div>
            <ModuleList/>
        </div>
    );
}

export default Modules;