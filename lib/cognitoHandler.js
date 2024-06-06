import { fetchAuthSession } from "aws-amplify/auth";

export async function currentSession() {
    try {
        const { accessToken, idToken } =
            (await fetchAuthSession()).tokens ?? {};
        console.log("Access Token:", accessToken);
        return accessToken;
    } catch (error) {
        console.error("Error getting session:", error);
    }
}
