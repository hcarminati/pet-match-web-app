import React from 'react';
import './index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import {format, parseISO} from 'date-fns';

const CommentComponent = ({user, comments, handleDeleteComment, publicProfile}) => {

    const formatDate = (date) => {
        try {
            const parsedDate = parseISO(date);
            const formattedDate = format(parsedDate, 'MMMM dd, yyyy HH:mm:ss');
            return formattedDate;
        } catch (error) {
            console.error('Error occurred while formatting the date:', error);
            return ''; // Return an empty string or handle the error accordingly
        }
    };
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
                                                {formatDate(comment.date)}
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
