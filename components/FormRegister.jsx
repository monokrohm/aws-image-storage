"use client";

import "../lib/amplifyClientUtils";
import "@aws-amplify/ui-react/styles.css";
import { Button } from "@aws-amplify/ui-react";
import { handleRegister } from "@/lib/cognitoFunctions";

export default function FormRegister() {
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");

    return (
        <div>
            <h1>Sign Up</h1>
            <form action={handleRegister}>
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
                <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                />
                <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                />
                <input name="email" type="email" placeholder="Email" required />
                <Button type="submit">Sign Up</Button>
            </form>
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
            {/* {success && <p style={{ color: "green" }}>{success}</p>} */}
        </div>
    );
}
