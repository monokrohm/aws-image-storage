import "../lib/amplifyClientUtils";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "./amplifyServerUtils";
import { cookies } from "next/headers";

export default async function getToken() {
    const session = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: async (contextSpec) => {
            const authSession = await fetchAuthSession(contextSpec);
            return authSession;
        },
    });

    const token = session.tokens.idToken;
    // console.log("ID Token:", token);
    return token;
}
