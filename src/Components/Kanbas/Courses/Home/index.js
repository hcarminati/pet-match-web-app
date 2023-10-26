import Modules from "../Modules";
import './index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBell,
    faBullhorn,
    faChartSimple,
    faCrosshairs,
    faFileImport,
    faShareFromSquare
} from "@fortawesome/free-solid-svg-icons";

function Home() {
    return (
        <div>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-8">
                    <Modules/>
                </div>
                <div className="col-4">
                    <div className="course-status d-none d-lg-block">
                        <ul className="list-unstyled">
                            <li>
                                <a href="#" className="btn btn-secondary w-100 mb-1">
                                    <div className="d-flex align-items-center">
                                        <div className="me-2">
                                            <FontAwesomeIcon icon={faFileImport}></FontAwesomeIcon>
                                        </div>
                                        Import Existing Content
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="btn btn-secondary w-100 mb-1">
                                    <div className="d-flex align-items-center">
                                        <div className="me-2">
                                            <FontAwesomeIcon icon={faShareFromSquare}/>
                                        </div>
                                        Import From Commons
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="btn btn-secondary w-100 mb-1">
                                    <div className="d-flex align-items-center">
                                        <div className="me-2">
                                            <FontAwesomeIcon icon={faCrosshairs}></FontAwesomeIcon>
                                        </div>
                                        Choose Home Page
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="btn btn-secondary w-100 mb-1">
                                    <div className="d-flex align-items-center">
                                        <div className="me-2">
                                            <FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon>
                                        </div>
                                        View Course Stream
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="btn btn-secondary w-100 mb-1">
                                    <div className="d-flex align-items-center">
                                        <div className="me-2">
                                            <FontAwesomeIcon icon={faBullhorn}></FontAwesomeIcon>
                                        </div>
                                        New Announcement
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="btn btn-secondary w-100 mb-1">
                                    <div className="d-flex align-items-center">
                                        <div className="me-2">
                                            <FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon>
                                        </div>
                                        New Analytics
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="btn btn-secondary w-100 mb-1">
                                    <div className="d-flex align-items-center">
                                        <div className="me-2">
                                            <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                                        </div>
                                        View Course Notifications
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <h6>To Do</h6>
                        <hr/>
                        <div className="row">
                            <div className="col-1">
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="col-10">
                                <p className="to-do-top-row-text">Grade A1 - ENV + HTML</p>
                                <p>100 points * Sep 18 at 11:59pm</p>
                            </div>
                            <div className="col-1">
                                <i className="fas fa-x float-end"></i>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mb-0">
                            <h6>Coming Up</h6>
                            <div className="d-flex align-items-center">
                                <i className="fas fa-calendar me-2 mb-3"></i>
                                <p>View Calendar</p>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-2">
                                <i className="fas fa-calendar me-2 mb-3 text-muted"></i>
                            </div>
                            <div className="col-10">
                                <a href="#" className="text-danger text-decoration-none">Lecture</a>
                                <p className="text-muted">CS4550.12631.202410 Sep 7 at
                                    11:45am</p>
                            </div>
                            <div className="col-2">
                                <i className="fas fa-calendar me-2 mb-3 text-muted"></i>
                            </div>
                            <div className="col-10">
                                <a href="#" className="text-danger text-decoration-none">CS5610 06
                                    SP23
                                    Lecture</a>
                                <p className="text-muted">CS4550.12631.202410 Sep 7 at
                                    11:45am</p>
                            </div>
                            <div className="col-2">
                                <i className="fas fa-calendar me-2 mb-3 text-muted"></i>
                            </div>
                            <div className="col-10">
                                <a href="#" className="text-danger text-decoration-none">CS5610 Web
                                    Development
                                    Summer 1 2023 - LECTURE</a>
                                <p className="text-muted">CS4550.12631.202410 Sep 11 at
                                    11:45am</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;