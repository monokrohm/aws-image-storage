"use client";

import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import "../../../lib/amplifyClientUtils";
import "@aws-amplify/ui-react/styles.css";
import { Button } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let redirectTo = "/user/dashboard";
        try {
            const { isSignedIn, nextStep } = await signIn({
                username,
                password,
            });
            if (nextStep === "CONFIRM_SIGN_UP") {
                await resendSignUpCode({ username });
                redirectTo = "/auth/verify";
            }

            setSuccess("Login successful!");
            setError("");
        } catch (err) {
            setError(err.message);
            setSuccess("");
        }
        router.push(redirectTo);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Login</Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
}
