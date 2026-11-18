import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../services/api';

function Upload({ currentUser, authReady }) {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isLoggedIn =
        currentUser && localStorage.getItem('token');

    // Wait until the saved login information is checked
    if (!authReady) {
        return null;
    }

    // Show the login message when the user is logged out
    if (!isLoggedIn) {
        return (
            <main className="upload-page">
                <section className="upload-container">
                    <h1>Please login to continue</h1>

                    <p>
                        You need to login before uploading photos.
                    </p>

                    <Link to="/login-register">
                        Login
                    </Link>
                </section>
            </main>
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        // Check login status before sending the photo
        if (!currentUser || !localStorage.getItem('token')) {
            setError('Please login to continue');
            return;
        }

        if (!photo) {
            setError('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('title', title);
        formData.append('description', description);

        setIsLoading(true);

        try {
            await apiRequest('/photos', {
                method: 'POST',
                body: formData
            });

            navigate('/photos');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="upload-page">
            <section className="upload-container">
                <h1>Share Your Memory</h1>
                <p>Upload a photo and share its story.</p>

                {error && (
                    <p className="error-message">{error}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="photo-title">
                        Photo Title
                    </label>

                    <input
                        id="photo-title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Enter photo title"
                        required
                    />

                    <label htmlFor="photo-description">
                        Description
                    </label>

                    <textarea
                        id="photo-description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Write something about this photo"
                    />

                    <label htmlFor="photo-file">
                        Choose Photo
                    </label>

                    <input
                        id="photo-file"
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={(event) => setPhoto(event.target.files[0])}
                        required
                    />

                    {photo && <p>{photo.name}</p>}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Uploading...' : 'Upload Photo'}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Upload;