import React, { useEffect, useState } from 'react';

const TagButton = ({ tag }) => {
    return (
        <button>{tag}</button>
    );
};

const ImageTags = ({ image_url }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch(`/api/get-tags?image_url=${encodeURIComponent(image_url)}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setTags(data);
            } catch (error) {
                console.error('Error fetching tags:', error);
                // Handle error state or show error message to the user
            }
        };

        fetchTags();
    }, [image_url]);

    return (
        <div>
            {tags.map((tag) => (
                <TagButton key={tag} tag={tag} />
            ))}
        </div>
    );
};

export default ImageTags;