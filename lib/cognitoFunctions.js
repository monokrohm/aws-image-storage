import {
    getCurrentUser,
    signUp,
    confirmSignUp,
    signIn,
    autoSignIn,
} from "aws-amplify/auth";
import { redirect } from "next/navigation";

// Debugger
export default async function currentAuthenticatedUser() {
    try {
        const { username, userId, signInDetails } = await getCurrentUser();
        console.log(`The username: ${username}`);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function handleRegister(formData) {
    try {
        const { isSignUpComplete, userId, nextStep } = await signUp({
            username: String(formData.get("username")),
            password: String(formData.get("password")),
            options: {
                userAttributes: {
                    given_name: String(formData.get("firstName")),
                    family_name: String(formData.get("lastName")),
                    email: String(formData.get("email")),
                },
                autoSignIn: true,
            },
        });
    } catch (err) {
        return;
    }
    redirect("/auth/verify");
}

export async function handleVerify(formData) {
    try {
        const { isSignUpComplete, userId, nextStep } = await confirmSignUp({
            username: String(formData.get("username")),
            confirmationCode: String(formData.get("confirmationCode")),
        });
        await autoSignIn();
    } catch (err) {
        return;
    }
    redirect("/user/dashboard");
}

export async function handleLogin(formData) {
    let redirectTo = "/user/dashboard";
    console.log(formData.get("username"));
    try {
        const { isSignedIn, nextStep } = await signIn({
            username: String(formData.get("username")),
            password: String(formData.get("password")),
        });
        if (nextStep === "CONFIRM_SIGN_UP") {
            await resendSignUpCode({ username });
            redirectTo = "/auth/verify";
        }
    } catch (err) {}
    redirect(redirectTo);
}
