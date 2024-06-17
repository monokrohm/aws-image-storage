import ImageList from "@/components/ImageList";
import SearchBar from "@/components/SearchBar";
import FormUpload from "@/components/FormUpload";
import Image from "next/image";
import FormUploadSearch from "@/components/FormUploadSearch";

export default async function dashboard() {

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex flex-col mt-[120px] items-center object-cover">
                <SearchBar />
                <FormUpload />
                <FormUploadSearch />
                <Image
                    src="/images/bucket.png"
                    alt="Bucket Image Storage"
                    width={200}
                    height={10}
                    style={{ height: "auto", objectFit: "contain" }}
                ></Image>
            </div>
            <ImageList />
        </div>
    );
}
