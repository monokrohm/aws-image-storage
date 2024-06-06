"use client";

import { Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { confirmSignUp } from "aws-amplify/auth";
import "../../../lib/amplify";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Verify() {
    const [username, setUsername] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { isSignUpComplete, userId, nextStep } = await confirmSignUp({
                username,
                confirmationCode,
            });
            setSuccess("Verification successful! Redirecting...");
            setError("");
        } catch (err) {
            setError(err.message);
            setSuccess("");
        }
        router.push("/user/dashboard");
    };

    return (
        <div>
            <h1>Verify Account</h1>
            <p>Please check your email to verify your account.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Confirmation Code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    required
                />
                <Button type="submit">Verify</Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
}
