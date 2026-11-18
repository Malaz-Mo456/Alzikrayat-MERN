import { useState } from 'react';

function CommentForm({ onSubmit }) {
    // Store the comment entered by the user
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent submitting an empty comment
        if (!comment.trim()) return;

        // Send the comment to the parent component
        await onSubmit(comment);

        // Clear the input after submitting
        setComment('');
    };
//show the form
    return (
        <form
            className="comment-form"
            onSubmit={handleSubmit}
        >
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                required
            />

            <button type="submit">
                Add Comment
            </button>
        </form>
    );
}

export default CommentForm;