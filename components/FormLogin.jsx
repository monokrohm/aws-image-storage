"use client";

// import { useState } from "react";

import "../lib/amplifyClientUtils";
import { handleLogin } from "@/lib/cognitoFunctions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function FormLogin() {
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");
    const router = useRouter();

    return (
        <div className="p-8 border-4 rounded-lg">
            <h1 className="mb-6 mx-2 text-sky-950 text-xl font-bold">Login</h1>
            <form action={handleLogin} className="flex flex-col items-center mx-2 mb-8">
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    className="py-2 px-3 my-2 border-2 outline-none rounded-lg"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="py-2 px-3 my-2 border-2 outline-none rounded-lg"
                />
                <div className="flex mt-6 justify-between w-full">
                    <Button type="button" onClick={() => router.push("/")} className="w-24" >Cancel</Button>
                    <Button type="submit" className="w-24">Login</Button>
                </div>
            </form>
            {/* {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>} */}
            <span onClick={() => router.push("/auth/verify")} className="mx-2 underline cursor-pointer">Need to verify?</span>
        </div>
    );
}
