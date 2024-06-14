import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "./lib/amplifyServerUtils";

export async function middleware(request) {
    const response = NextResponse.next();

    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: { request, response },
        operation: async (contextSpec) => {
            try {
                const session = await fetchAuthSession(contextSpec);
                return session.tokens !== undefined;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    });

    console.log("Authenticated:", authenticated);

    if (authenticated) {
        return response;
    }

    return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
    matcher: ["/user/:path*", "/auth/"],
};
