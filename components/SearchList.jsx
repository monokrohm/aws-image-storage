"use client";

import { useEffect, useState } from "react";
import ImageComponent from "./ImageComponent";

export default function SearchList({ tags }) {
    const [imageKeys, setImageKeys] = useState([]);
    const terms = tags;

    useEffect(() => {
        if (!terms) return;

        const fetchImages = async () => {
            const tags = terms.split(',');

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
                    // console.log('Data:', data);
                    const imageKeys = data.data.map(url => {
                        const imageName = url.split('/');
                        // console.log('ImageName:', imageName);
                        return imageName[imageName.length - 1];
                    });
                    // console.log('ImageKeys:', imageKeys);
                    setImageKeys(imageKeys);
                } else {
                    console.error('Error querying images:', await res.json());
                }
            } catch (error) {
                console.error('Error querying images:', error);
            }
        };

        fetchImages()
    }, [])

    return (
        <div className="flex flex-col space-x-2 px-3 py-3 lg:px-10">
            {imageKeys.map((key, index) => (
                <ImageComponent key={index} imageKey={key} />
            ))}
        </div>
    )
}