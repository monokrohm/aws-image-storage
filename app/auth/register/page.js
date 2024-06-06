"use client";

import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import "../../../lib/amplify";
import "@aws-amplify/ui-react/styles.css";
import { Button } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username,
                password,
                options: {
                    userAttributes: {
                        given_name: firstName,
                        family_name: lastName,
                        email: email,
                    },
                },
            });
            // setSuccess(
            //     "Sign up successful! Please check your email to verify your account."
            // );
            setError("");
        } catch (err) {
            setError(err.message);
        }
        router.push("/auth/verify");
    };

    return (
        <div>
            <h1>Sign Up</h1>
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
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit">Sign Up</Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* {success && <p style={{ color: "green" }}>{success}</p>} */}
        </div>
    );
}
