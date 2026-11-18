import { useState } from 'react';

function UploadForm({ onUpload, isLoading }) {
    // Store the photo information
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the user selected a photo
        if (!photo) {
            alert('Please select a photo.');
            return;
        }

        // Prepare the data for uploading
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('photo', photo);

        onUpload(formData);
    };

    return (
        <form
            className="upload-form"
            onSubmit={handleSubmit}
        >
            <h2>Share a Memory</h2>

            <input
                type="text"
                placeholder="Photo Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                placeholder="Photo Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
            />

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload Photo'}
            </button>
        </form>
    );
}

export default UploadForm;