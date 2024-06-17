"use client";

import { Button } from "./ui/button";
import { useState } from 'react';

export default function SearchBar() {
    const [input, setInput] = useState("");
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tags = input.split(',').map(tag => tag.trim()).filter(tag => tag);

        try {
            const res = await fetch('/api/get-query-images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tags })
            });

            if (res.ok) {
                const data = await res.json();
                setImages(data.data);
            } else {
                console.error('Error querying images:', await res.json());
            }
        } catch (error) {
            console.error('Error querying images:', error);
        }
    };

    // console.log("Images", images);

    return (
        <div className=" md:max-w-2xl">
            <div
                className="flex flex-1 items-center w-max mx-5 px-9 py-4 space-x-2  
            bg-white shadow-xl rounded-full border-0"
            >
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search for images..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="outline-none"
                    />
                    <Button variant="ghost" type="submit">
                        Search
                    </Button>
                </form>
            </div>
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
        </div>
    );
}

