import React from 'react';
import './index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';

const CommentComponent = ({user, comments, handleDeleteComment, publicProfile}) => {
    return (
        <ul>
            {comments.map((comment) => (
                <div className="comment-container me-5">
                    <div className="d-flex mt-2">
                        <Link
                            to={publicProfile ? `/Pet/${comment.petId}`
                                              : `/user/profile/${comment.userId}`}
                            className="single-comment text-decoration-none text-black"
                            key={comment._id}
                        >
                            {comment.username}
                            <span className="ms-3 text-muted">
                                                {comment.date}
                                            </span>
                        </Link>
                        {(comment.username === user.username
                          | user.role === "ADMIN") ?
                         <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteComment(
                             comment._id)}></FontAwesomeIcon>
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
