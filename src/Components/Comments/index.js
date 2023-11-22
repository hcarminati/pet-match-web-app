import React from 'react';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

const CommentComponent = ({comments, handleDeleteComment}) => {
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.userReducer);

    return (
        <ul>
            {comments.map((comment) => (
                <div className="comment-container me-5">
                    <div className="d-flex mt-2">
                        <Link className="single-comment text-decoration-none text-black" key={comment._id}>
                            {comment.username}
                            <span className="ms-3 text-muted">
                                                {comment.date}
                                            </span>
                        </Link>
                        {(comment.username === userReducer.username
                          | userReducer.role === "ADMIN" ) ?
                         <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteComment(comment._id)}></FontAwesomeIcon>
                                                           : <></>}
                    </div>
                    <p className="ms-4">
                        {comment.comment}
                    </p>
                </div>
            ))}

        </ul>
    );
}

export default CommentComponent;
