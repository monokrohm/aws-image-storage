"use client";

// import { useState } from "react";

import "../lib/amplifyClientUtils";
import "@aws-amplify/ui-react/styles.css";
import { Button } from "@aws-amplify/ui-react";
import { handleResendCode, handleVerify } from "@/lib/cognitoFunctions";

export default function FormVerify() {
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");

    return (
        <div className="p-8 border-4 rounded-lg">
            <h1 className="mb-6 text-sky-950 text-xl font-bold">Verify Account</h1>
            <p className="mb-4 text-sky-950 text-md font-bold">Please check your email to verify your account.</p>
            <form action={handleVerify} className="flex items-center space-x-2">
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    className="py-2 px-3 my-2 border-2 outline-none rounded-lg"
                />
                <input
                    name="confirmationCode"
                    type="text"
                    placeholder="Confirmation Code"
                    required
                    className="py-2 px-3 my-2 border-2 outline-none rounded-lg"
                />
                <Button type="submit">Verify</Button>
            </form>
            <form action={handleResendCode} className="flex items-center space-x-2">
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    className="py-2 px-3 my-2 border-2 outline-none rounded-lg"
                />
                <Button type="submit">Resend Code</Button>
            </form>
            {/* {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>} */}
        </div>
    );
}
