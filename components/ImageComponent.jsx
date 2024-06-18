"use client";

import fetcher from "@/lib/fetcher";
import Image from "next/image";
import useSWR from 'swr';

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import ImageUrl from "./ImageUrl";
import ImageTags from "./ImageTags";

export default function ImageComponent({ imageKey }) {
    const { data, error } = useSWR(`/api/get-image?key=${imageKey}`, fetcher, { revalidateOnFocus: false });
    const objectKey = imageKey;

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
            // window.location.reload()
            window.location.href = "/user/dashboard";
        } catch (err) {
            console.error('Error deleting image:', err);
        }
    }

    return (
        <div className="my-2 px-2 py-1 h-auto w-full border-4 rounded-lg">
            <div className="flex flex-shrink-0 items-center">
                <div className="pr-2 border-r-4">
                    <Image
                        name="ImageName"
                        src={data.dataUri}
                        alt="IMAGE"
                        height={0}
                        width={100}
                        className="h-auto w-auto max-w-28 max-h-28 object-cover rounded-md cursor-pointer transform
                    hover:scale-105 hover:rounded-lg transition duration-200 ease-out hover:drop-shadow-lg"
                    />
                </div>
                <div className="flex flex-grow-0 h-full border-r-4">
                    <ImageUrl imageKey={imageKey} />
                </div>
                <ImageTags imageKey={imageKey} />
                <DeleteForeverTwoToneIcon
                    onClick={() => handleDelete()}
                    className="ml-auto cursor-pointer transform hover:scale-105 hover:rounded-lg transition duration-200 ease-out hover:drop-shadow-lg"
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