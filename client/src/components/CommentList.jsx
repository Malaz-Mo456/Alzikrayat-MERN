function CommentList({ comments = [] }) {
    // Show a message when there are no comments
    if (comments.length === 0) {
        return (
            <p className="no-comments">
                No comments yet. Be the first to comment!
            </p>
        );
    }

    return (
        <div className="comment-list">
            {comments.map((item) => (
                <div
                    className="comment-item"
                    key={item._id}
                >
                    <div className="comment-header">
                        <strong>
                            {item.userId?.firstName || 'User'}
                        </strong>

                        <span>
                            {item.dateTime
                                ? new Date(item.dateTime).toLocaleDateString()
                                : ''}
                        </span>
                    </div>

                    <p>{item.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default CommentList;