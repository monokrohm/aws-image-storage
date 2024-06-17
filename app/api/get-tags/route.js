import getToken from "@/lib/getToken";
import { NextResponse } from "next/server";

export async function POST(req) {
    if (req.method !== "POST") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    try {
        const { image_url } = await req.json();
        if (!image_url) {
            return NextResponse.json(
                { error: "Image URL is required" },
                { status: 400 }
            );
        }

        const token = await getToken();

        const res = await fetch(
            `https://pczzuuaky5.execute-api.ap-southeast-2.amazonaws.com/api/getTags`,
            {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image_url }),
            }
        );

        if (!res.ok) {
            throw new Error("Failed to get tags from DB via API Gateway");
        }

        const data = await res.json();
        // console.log("Tags fetched:", data);
        return NextResponse.json({ data });
    } catch (error) {
        console.error("Error fetching tags:", error);
        return NextResponse.json(
            { error: "Error fetching tags" },
            { status: 500 }
        );
    }
}
