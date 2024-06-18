import SearchBar from "@/components/SearchBar";
import FormUpload from "@/components/FormUpload";
import Image from "next/image";
import FormUploadSearch from "@/components/FormUploadSearch";

export default function SearchComponents() {
    return (
        <div className="flex flex-col mt-[220px]">
            <div className="flex flex-col items-center mb-10 mx-4">
                <div className="flex items-center justify-between mb-12">
                    <SearchBar />
                    <FormUploadSearch />
                    <FormUpload />
                </div>
                <Image
                    src="/images/bucket.png"
                    alt="Bucket Image Storage"
                    width={200}
                    height={10}
                    style={{ height: "auto", objectFit: "contain" }}
                ></Image>
            </div>
        </div>
    )
}