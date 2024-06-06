// import { NextResponse } from "next/server";
// import "./lib/amplify";
// import { currentSession } from "./lib/cognitoHandler";

// export async function middleware(request) {
//     if (request.nextUrl.pathname.startsWith("/user")) {
//         const accessToken = await currentSession();
//         console.log("Access Token:", accessToken);
//         if (!accessToken) {
//             return NextResponse.redirect(new URL("/auth/login", request.url));
//         }
//         return NextResponse.redirect(new URL("/", request.url));
//     }

//     // return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//     matcher: ["/user/:path*"], // Add more routes here if needed
// };

import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";

export async function middleware(request) {
    const response = NextResponse.next();

    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: { request, response },
        operation: async (contextSpec) => {
            try {
                const session = await fetchAuthSession(contextSpec);
                return (
                    session.tokens?.accessToken !== undefined &&
                    session.tokens?.idToken !== undefined
                );
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    });

    if (authenticated) {
        console.log("User is authenticated");
        return response;
    }

    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/user/:path*",
    ],
};
