"use client";

import React from "react";
import DropMenu from "./DropMenu";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex sticky justify-between items-center top-0 p-5 px-8 mx-4 my-[-95.5px] bg-white border-b-[3px] border-b-[#0F172A] rounded-lg  z-50">
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
