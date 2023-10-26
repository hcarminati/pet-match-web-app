import db from "../../Database";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faCog,
    faFileExport,
    faFileImport, faFilter, faKeyboard,
    faSearch
} from "@fortawesome/free-solid-svg-icons";

function Grades() {
    const {courseId} = useParams();
    const assignments = db.assignments.filter((assignment) => assignment.course === courseId);
    const enrollments = db.enrollments.filter((enrollment) => enrollment.course === courseId);
    return (
        <div>
            <div className="row">
                <div className="col-6 text-danger mt-2">
                    <div className="row">
                        <div className="col-10 col-sm-11">
                            <p>Gradebook <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                            </p>
                        </div>
                        <div className="col-1 col-sm-1">
                            <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>

                <div className="col-6">
                    <div className="d-flex align-items-center justify-content-end mb-2">
                        <a href="#" className="btn btn-secondary" role="button">
                            <FontAwesomeIcon className="me-1" icon={faFileImport}></FontAwesomeIcon>
                            Import
                        </a>
                        <a href="#" className="btn btn-secondary ms-1" role="button">
                            <FontAwesomeIcon className="me-1" icon={faFileExport}></FontAwesomeIcon>
                            Export
                        </a>
                        <a href="#" className="btn btn-secondary ms-1" role="button">
                            <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                        </a>

                    </div>
                </div>
            </div>
            <div id="module-1" className="row">
                <form id="assignment-edit">

                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="text-fields-student-name" className="form-label">
                                <h6>Student Names</h6>
                            </label>

                            <div className="input-group">
                                                        <span className="input-group-text">
                                                            <FontAwesomeIcon
                                                                icon={faSearch}></FontAwesomeIcon>
                                                        </span>
                                <select className="form-select" id="text-fields-student-name">
                                    <option selected disabled>Search Students</option>
                                    <option value="student1">Student 1</option>
                                    <option value="student2">Student 2</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-6">
                            <label htmlFor="text-fields-assignment-name" className="form-label">
                                <h6>Assignment Names</h6>
                            </label>

                            <div className="input-group">
                                                        <span className="input-group-text">
                                                            <FontAwesomeIcon
                                                                icon={faSearch}></FontAwesomeIcon>
                                                        </span>
                                <select className="form-select" id="text-fields-assignment-name">
                                    <option selected>Search Assignments</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <a href="#" className="btn btn-secondary mt-3 mb-3" role="button">
                        <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                        Apply Filters
                    </a>
                </form>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Student Name</th>
                        {assignments.map((assignment) => (
                            <th key={assignment._id}>{assignment.title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {enrollments.map((enrollment, index) => {
                        const user = db.users.find((user) => user._id === enrollment.user);
                        return (
                            <tr key={enrollment.user}>
                                <td className="text-danger">{user.firstName} {user.lastName}</td>
                                {assignments.map((assignment) => {
                                    const grade = db.grades.find(
                                        (grade) => grade.student === enrollment.user
                                                   && grade.assignment === assignment._id
                                    );
                                    return <td key={assignment._id}>{grade?.grade || ""}</td>;
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Grades;