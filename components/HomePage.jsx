"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            <div className="mb-12 font-bold text-4xl">Welcome</div>
            <div className="flex w-full justify-center space-x-24">
                <div className="flex flex-shrink-0">
                    <Image
                        src="/images/bucket.png"
                        alt="Bucket Image Storage"
                        width={400}
                        height={400}></Image>
                </div>
                <div className="flex flex-col m-4 items-center justify-center space-y-10">
                    <Button className="p-[80px] max-w-[200px] font-bold text-lg transform
                    hover:scale-105 hover:rounded-lg transition duration-200 ease-out hover:drop-shadow-lg" onClick={() => router.push("/auth/register")}>Sign Up</Button>
                    <Button className="p-[80px] max-w-[200px] font-bold text-lg transform
                    hover:scale-105 hover:rounded-lg transition duration-200 ease-out hover:drop-shadow-lg" onClick={() => router.push("/auth/login")}>Login</Button>
                </div>
            </div>
        </div>
    )
}