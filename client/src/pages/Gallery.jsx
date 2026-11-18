import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiRequest from '../services/api';

function Gallery() {
    const [photos, setPhotos] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const data = await apiRequest('/photos');
                setPhotos(data.photos || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadPhotos();
    }, []);

    if (isLoading) {
        return <p className="loading-message">Loading photos...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <main className="photos-section">
            <div className="photos-header">
                <div>
                    <h1>Our Gallery</h1>
                    <p>Explore memories shared by our community.</p>
                </div>

                <div className="view-controls">
                    <button
                        type="button"
                        onClick={() => setViewMode('grid')}
                        className={viewMode === 'grid' ? 'active' : ''}
                    >
                        Grid View
                    </button>

                    <button
                        type="button"
                        onClick={() => setViewMode('list')}
                        className={viewMode === 'list' ? 'active' : ''}
                    >
                        List View
                    </button>
                </div>
            </div>

            {photos.length === 0 ? (
                <p className="empty-message">No photos have been uploaded yet.</p>
            ) : (
                <div className={`photos-grid ${viewMode}`}>
                    {photos.map((photo) => (
                        <article className="photo-card" key={photo._id}>
                            <Link
                                to={`/photos/${photo._id}`}
                                className="photo-card-link"
                            >
                                <div className="photo-image">
                                    <img
                                        src={`/uploads/${photo.fileName}`}
                                        alt={photo.title}
                                    />
                                </div>

                                <div className="photo-info">
                                    <h3>{photo.title}</h3>

                                    <p>
                                        By {photo.userId?.firstName || 'Community member'}
                                    </p>

                                    <p>{photo.description}</p>
                                </div>
                            </Link>

                            <div className="photo-card-footer">
                                <Link
                                    to={`/photos/${photo._id}`}
                                    className="btn-details"
                                >
                                    View Details
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Gallery;