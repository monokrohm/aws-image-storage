"use client";

// import { useState } from "react";

import "../lib/amplifyClientUtils";
import "@aws-amplify/ui-react/styles.css";
import { Button } from "@aws-amplify/ui-react";
import { handleVerify } from "@/lib/cognitoFunctions";

export default function FormVerify() {
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");

    return (
        <div>
            <h1>Verify Account</h1>
            <p>Please check your email to verify your account.</p>
            <form action={handleVerify}>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                />
                <input
                    name="confirmationCode"
                    type="text"
                    placeholder="Confirmation Code"
                    required
                />
                <Button type="submit">Verify</Button>
            </form>
            {/* {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>} */}
        </div>
    );
}
