"use client";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from 'react';
import { Button } from './ui/button';

export default function FormUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/put-image', {
                method: 'PUT',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to upload image');
            }

            // const data = await res.json();
            // console.log('Image uploaded:', data.id);
            // window.location.reload()
            window.location.href = "/user/dashboard";
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
                    {loading ? 'Uploading...' : 'Upload'}
                </Button>
            </div>
        </div >
    );
}
