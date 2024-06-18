"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ImageUrl({ imageKey }) {
    const [signedUrl, setSignedUrl] = useState('');
    const [imageName, setImageName] = useState('');
    const key = imageKey;

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
        <div className='flex flex-1 px-8 py-6'>
            <Link href={signedUrl} target="_blank" rel="noopener noreferrer" className='text-decoration-line: underline'>{imageName}</Link>
        </div>
    );
}