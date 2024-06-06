"use client";

import React from "react";
import DropMenu from "./DropMenu";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex fixed justify-between items-center top-0 p-5 px-8 w-full z-50 bg-[#0F172A]">
            <Link href="/">
                <Image
                    src="https://pngimg.com/uploads/bucket/bucket_PNG7764.png"
                    alt="Bucket Image Storage"
                    width={70}
                    height={0}
                    style={{ height: "auto" }}
                ></Image>
            </Link>
            <DropMenu />
        </header>
    );
}
