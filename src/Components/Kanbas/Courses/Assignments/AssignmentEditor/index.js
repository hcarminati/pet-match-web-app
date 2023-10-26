import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import db from "../../../Database";
import {Link} from "react-router-dom";

function AssignmentEditor() {
    const {assignmentId} = useParams();
    const assignment = db.assignments.find(
        (assignment) => assignment._id === assignmentId);

    const {courseId} = useParams();
    const navigate = useNavigate();
    const handleSave = () => {
        console.log("Actually saving assignment TBD in later assignments");
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    return (
        <div>
            <label htmlFor="text-fields-assignment-name"
                   className="form-label">
                Assignment Name</label>
            <input id="text-fields-assignment-name"
                   value={assignment.title}
                   className="form-control"/>
            <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                  className="btn btn-danger mt-2">
                Cancel
            </Link>
            <button onClick={handleSave} className="btn btn-success ms-2 mt-2">
                Save
            </button>
        </div>
    );
}

export default AssignmentEditor;