import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col mt-[120px] items-center bg-red-100 h-screen object-cover">
                <SearchBar />
                <Image
                    src="https://pngimg.com/uploads/bucket/bucket_PNG7764.png"
                    alt="Bucket Image Storage"
                    width={200}
                    height={0}
                    style={{ objectFit: "contain" }}
                ></Image>
            </div>
        </div>
    );
}
