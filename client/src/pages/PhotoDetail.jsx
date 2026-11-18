import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiRequest from '../services/api';

function PhotoDetail({ currentUser }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [photo, setPhoto] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPhoto = async () => {
            setIsLoading(true);
            setError('');

            try {
                const [photoData, commentData] = await Promise.all([
                    apiRequest(`/photos/${id}`),
                    apiRequest(`/photos/${id}/comments`)
                ]);

                setPhoto(photoData.photo);
                setComments(commentData.comments || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadPhoto();
    }, [id]);

    // Send a new comment
    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        if (!commentText.trim()) {
            return;
        }

        try {
            const data = await apiRequest(`/photos/${id}/comments`, {
                method: 'POST',
                body: JSON.stringify({
                    comment: commentText
                })
            });

            setComments((previousComments) => [
                ...previousComments,
                data.comment
            ]);

            setCommentText('');
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    // Delete the photo
    const handleDelete = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this photo?'
        );

        if (!confirmed) {
            return;
        }

        try {
            await apiRequest(`/photos/${id}`, {
                method: 'DELETE'
            });

            navigate('/photos');
        } catch (error) {
            setError(error.message);
        }
    };

    if (isLoading) {
        return <p className="loading-message">Loading photo...</p>;
    }

    if (error && !photo) {
        return <p className="error-message">{error}</p>;
    }

    if (!photo) {
        return <p className="error-message">Photo not found.</p>;
    }

    // Check if the current user owns the photo
    const ownerId = photo.userId?._id || photo.userId;

    const isOwner =
        currentUser &&
        String(ownerId) === String(currentUser._id);

    return (
        <main className="photo-detail-page">
            <Link to="/photos" className="back-link">
                Back to Gallery
            </Link>

            <section className="photo-detail-card">
                <div className="photo-detail-image">
                    <img
                        src={`/uploads/${photo.fileName}`}
                        alt={photo.title || 'Shared memory'}
                    />
                </div>

                <div className="photo-detail-info">
                    <h1>{photo.title}</h1>

                    <p>{photo.description}</p>

                    <p>
                        Shared by {photo.userId?.firstName || 'Community member'}
                    </p>

                    <p>
                        {new Date(photo.dateTime).toLocaleDateString()}
                    </p>

                    {isOwner && (
                        <button
                            type="button"
                            className="delete-button"
                            onClick={handleDelete}
                        >
                            Delete Photo
                        </button>
                    )}
                </div>
            </section>

            <section className="comments-section">
                <h2>Comments</h2>

                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <div className="comments-list">
                        {comments.map((item) => (
                            <article className="comment-item" key={item._id}>
                                <h3>
                                    {item.userId?.firstName || 'User'}{' '}
                                    {item.userId?.lastName || ''}
                                </h3>

                                <p>{item.comment}</p>

                                <small>
                                    {new Date(item.dateTime).toLocaleString()}
                                </small>
                            </article>
                        ))}
                    </div>
                )}

                {currentUser ? (
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={commentText}
                            onChange={(event) =>
                                setCommentText(event.target.value)
                            }
                            placeholder="Write your comment"
                            required
                        />

                        <button type="submit">
                            Add Comment
                        </button>
                    </form>
                ) : (
                    <p>
                        Please <Link to="/login-register?mode=login">login</Link> to add a comment.
                    </p>
                )}

                {error && <p className="error-message">{error}</p>}
            </section>
        </main>
    );
}

export default PhotoDetail;
