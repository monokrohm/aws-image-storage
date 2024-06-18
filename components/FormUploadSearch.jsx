"use client";

import { Input } from "@/components/ui/input"

import { useState } from 'react';
import { Button } from './ui/button';

export default function FormUploadSearch() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [imageKeys, setImageKeys] = useState([]);

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
                // console.log('Data:', data);
                const imageKeys = data.data.map(url => {
                    const imageName = url.split('/');
                    // console.log('ImageName:', imageName);
                    return imageName[imageName.length - 1];
                });
                // console.log('ImageKeys:', imageKeys);
                // setImageKeys(imageKeys);

                if (imageKeys.length > 0) {
                    window.location.href = `/user/search?results=${imageKeys.join(',')}`;
                }
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
        <div className=" md:max-w-2xl">
            <div className="flex flex-1 items-center w-max mx-5 px-10 py-2   
            bg-white shadow-xl rounded-full border-0">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <Button variant="ghost" onClick={handleUpload} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </div>
        </div >
    );
}
