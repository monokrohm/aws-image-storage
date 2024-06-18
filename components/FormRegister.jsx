"use client";

import "../lib/amplifyClientUtils";
import "@aws-amplify/ui-react/styles.css";
// import { Button } from "@aws-amplify/ui-react";
import { Button } from "./ui/button";
import { handleRegister } from "@/lib/cognitoFunctions";
import { useRouter } from "next/navigation";

export default function FormRegister() {
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");
    const router = useRouter();

    return (
        <div className="p-8 border-4 rounded-lg">
            <h1 className="mb-6 mx-2 text-sky-950 text-xl font-bold">Sign Up</h1>
            <form action={handleRegister} className="flex flex-col items-center mx-2">
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
                <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                    className="py-2 px-3 my-2 border-2 outline-none rounded-lg"
                />
                <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                    className="py-2 px-3 my-2 border-2 outline-none rounded-lg"
                />
                <input name="email" type="email" placeholder="Email" required className="py-2 px-3 my-2 border-2 outline-none rounded-lg" />
                <div className="flex mt-6 justify-between w-full">
                    <Button type="button" onClick={() => router.push("/")} className="w-24">Cancel</Button>
                    <Button type="submit" className="w-24">Sign Up</Button>
                </div>
            </form>
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
            {/* {success && <p style={{ color: "green" }}>{success}</p>} */}
        </div>
    );
}
