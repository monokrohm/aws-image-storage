"use client";

import fetcher, { extractImageKeys } from "@/lib/utility";
import Image from "next/image";
import useSWR from 'swr';

export default function ImageList() {
    const { data, error } = useSWR('/api/get-image?key=img2.jpg', fetcher);

    if (error) {
        return <div>Failed to load image</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    if (data.error) {
        return <div>{data.error}</div>;
    }

    return (
        <div>
            <Image
                src={data.dataUri}
                alt="USER"
                height={50}
                width={50}
            />
        </div>

    );
}
