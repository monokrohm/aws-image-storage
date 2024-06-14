"use client";

// import { useState } from "react";

import "../lib/amplifyClientUtils";
import { Button } from "@aws-amplify/ui-react";
import { handleLogin } from "@/lib/cognitoFunctions";

export default function FormLogin() {
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");

    return (
        <div>
            <h1>Login</h1>
            <form action={handleLogin}>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />
                <Button type="submit">Login</Button>
            </form>
            {/* {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>} */}
        </div>
    );
}
