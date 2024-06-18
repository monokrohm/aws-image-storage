"use client";

import { useEffect, useState } from "react";
import ImageComponent from "./ImageComponent";


export default function ImageList() {
    const [imageKeys, setImageKeys] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/get-image-list');
                const data = await res.json();

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data.xmlString, 'application/xml');
                const contents = xmlDoc.getElementsByTagName('Contents');
                const keys = Array.from(contents).map(content => content.getElementsByTagName('Key')[0].textContent);
                setImageKeys(keys);
                // console.log('Keys:', keys);
            } catch (error) {
                console.error('Error fetching or parsing XML:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col space-x-2 px-3 py-3 lg:px-10">
            {imageKeys.map((key, index) => (
                <ImageComponent key={index} imageKey={key} />
            ))}
        </div>
    );
}
