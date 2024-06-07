"use client";

import SearchBar from "@/components/SearchBar";
import Image from "next/image";

export default async function dashboard() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col mt-[120px] items-center bg-red-100 h-screen object-cover">
                <SearchBar />
                <Image
                    src="/images/bucket.png"
                    alt="Bucket Image Storage"
                    width={200}
                    height={0}
                    style={{ objectFit: "contain" }}
                ></Image>
            </div>
        </div>
    );
}
