"use client";

import { useState } from 'react';

export default function FormUploadSearch() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/get-query-with-image', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setImages(data.data);
            } else {
                throw new Error("Error querying images");
            }

        } catch (err) {
            console.error('Error uploading image:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
            {images.length > 0 && (
                <div>
                    <h3>Images:</h3>
                    <ul>
                        {images.map((url, index) => (
                            <li key={index}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
                        ))}
                    </ul>
                </div>
            )}
        </div >
    );
}
