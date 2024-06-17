"use client"
import { useState, useEffect } from 'react';

export default function ImageUrl() {
    const [signedUrl, setSignedUrl] = useState('');
    const [imageName, setImageName] = useState('');
    const key = "0-3.jpg";

    useEffect(() => {
        async function fetchSignedUrl() {
            try {
                const res = await fetch(`/api/get-signed-url?objectKey=${key}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch signed URL asa');
                }

                const data = await res.json();
                setSignedUrl(data.url);
            } catch (err) {
                console.error('Error fetching signed URL:', err);
            }
        }

        fetchSignedUrl();
    }, []);

    useEffect(() => {
        if (signedUrl) {
            const name = signedUrl.split('/').pop().split('?')[0];
            setImageName(name);
        }
    }, [signedUrl]);

    return (
        <div className='flex'>
            <a href={signedUrl} target="_blank" rel="noopener noreferrer">{imageName}</a>
        </div>
    );
}