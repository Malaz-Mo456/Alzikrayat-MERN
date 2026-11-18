import { Link } from 'react-router-dom';
import './photo-card.css';

function PhotoCard({ photo, currentUser, onDelete }) {
    // Check who uploaded the photo
    const photoOwnerId =
        photo.userId?._id || photo.userId;

    const isOwner =
        currentUser &&
        String(photoOwnerId) === String(currentUser._id);

    // Get the photo image path
    const imageSource =
        photo.imageUrl ||
        (photo.fileName
            ? `/uploads/${photo.fileName}`
            : '/images/thumb-1.jpg');

    return (
        <article className="photo-card">

            <Link
                to={`/photos/${photo._id}`}
                className="photo-card-link"
            >
                <div className="photo-card-image-wrapper">
                    <img
                        src={imageSource}
                        alt={photo.title || 'Shared memory'}
                        className="photo-card-image"
                    />
                </div>

                <div className="photo-card-info">
                    <h3>{photo.title || 'Untitled Memory'}</h3>

                    <p>
                        {photo.description || 'No description available.'}
                    </p>
                </div>
            </Link>

            {isOwner && onDelete && (
                <div className="photo-card-actions">
                    <button
                        type="button"
                        className="delete-button"
                        onClick={() => onDelete(photo._id)}
                    >
                        Delete Photo
                    </button>
                </div>
            )}

        </article>
    );
}

export default PhotoCard;
