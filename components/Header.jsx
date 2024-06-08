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
                    src="/images/bucket.png"
                    alt="Bucket Image Storage"
                    width={50}
                    height={0}
                    style={{ height: "auto" }}
                ></Image>
            </Link>
            <DropMenu />
        </header>
    );
}
