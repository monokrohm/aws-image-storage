import getToken from "@/lib/getToken";
import { NextResponse } from "next/server";

export async function POST(req) {
    if (req.method !== "POST") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    try {
        const { tags } = await req.json();
        if (!tags || !Array.isArray(tags) || tags.length === 0) {
            return NextResponse.json(
                { error: "Tags must be provided as a non-empty array" },
                { status: 400 }
            );
        }

        const token = await getToken();

        const res = await fetch(
            `https://pczzuuaky5.execute-api.ap-southeast-2.amazonaws.com/api/getQueryImages`,
            {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tags }),
            }
        );

        if (!res.ok) {
            throw new Error("Error querying images");
        }

        const data = await res.json();
        // console.log("Data", data);
        return NextResponse.json({ data });
    } catch (err) {
        console.log("Error querying images:", err);
        return NextResponse.json(
            { error: "Error querying images" },
            { status: 500 }
        );
    }
}
