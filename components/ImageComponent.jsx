"use client";

import fetcher from "@/lib/fetcher";
import Image from "next/image";
import useSWR from 'swr';

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import ImageUrl from "./ImageUrl";
import ImageTags from "./ImageTags";

export default function ImageComponent() {
    const { data, error } = useSWR('/api/get-image?key=0-3.jpg', fetcher, { revalidateOnFocus: false });
    const objectKey = "0-3.jpg";

    if (error) {
        return <div>Failed to load image</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    if (data.error) {
        return <div>{data.error}</div>;
    }

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/delete-image?objectKey=${objectKey}`, {
                method: 'DELETE',
            })
            if (!res.ok) {
                throw new Error('Failed to delete image');
            }

            // const data = await res.json();
            // console.log("Data", data)
            // console.log('Image deleted:', data.id);

        } catch (err) {
            console.error('Error deleting image:', err);
        }
    }

    return (
        <div className="px-2 py-1 h-auto w-full border-4 rounded-lg">

            <div className="flex flex-shrink-0 items-center justify-between">
                <Image
                    name="ImageName"
                    src={data.dataUri}
                    alt="IMAGE"
                    height={0}
                    width={100}
                    className="h-auto object-contain rounded-md cursor-pointer transform
    hover:scale-105 hover:rounded-lg transition duration-200 ease-out hover:drop-shadow-lg"
                />
                <ImageUrl />
                <ImageTags />
                <DeleteForeverTwoToneIcon
                    onClick={() => handleDelete()}
                    className="cursor-pointer transform hover:scale-105 hover:rounded-lg transition duration-200 ease-out hover:drop-shadow-lg"
                    sx={{
                        color: 'gray',
                        fontSize: 50, ':hover': {
                            color: 'red',
                        }
                    }} />
            </div>
        </div>

    );
}