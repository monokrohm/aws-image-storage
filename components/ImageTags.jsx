import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function ImageTags({ imageKey }) {
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const image_url = `https://ito5225-image-bucket.s3.ap-southeast-2.amazonaws.com/${imageKey}`;

    const handleAddTag = async (image_url, tag) => {
        try {
            const res = await fetch('/api/add-tag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image_url: image_url, tag: tag }),
            });

            if (res.ok) {
                const data = await res.json();
                setTags((currentTags) => [...currentTags, tag]);
                setTag('');
            } else {
                throw new Error('Failed to add tag');
            }
        } catch (error) {
            console.error('Error adding tag:', error);
        }
    };

    const handleDeleteTag = async (image_url, tag) => {
        try {
            const res = await fetch('/api/delete-tag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image_url: image_url, tag: tag }),
            });

            if (res.ok) {
                setTags((currentTags) => currentTags.filter((t) => t !== tag));
            } else {
                throw new Error('Failed to delete tag');
            }

        } catch (error) {
            console.error('Error deleting tag:', error);
            alert('Error deleting tag');
        }
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await fetch(`/api/get-tags`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image_url })
                });

                if (res.ok) {
                    const data = await res.json();
                    setTags(data.data.tags);
                } else {
                    console.error('Error retrieving tags:', await res.json());
                }
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, [image_url]);

    return (
        <div className='flex flex-col flex-1 border-r-4'>
            <div className='border-b-4 px-4 text-nowrap'>{image_url}</div>
            <div className='space-x-3 space-y-2 px-4 text-nowrap'>

                {tags.map((tag) => (
                    <Button key={tag} className="transform hover:scale-105 hover:bg-red-600 hover:rounded-lg transition duration-200 ease-out hover:drop-shadow-lg" onClick={() => handleDeleteTag(image_url, tag)}>{tag}</Button>
                ))}

                <input
                    type='text'
                    placeholder='Add a tag'
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className='outline-none'
                />
                <Button onClick={() => handleAddTag(image_url, tag)} className="justify-start transform hover:scale-105 hover:rounded-lg transition duration-200 ease-out hover:drop-shadow-lg">+</Button>
            </div>
        </div>
    );
};
