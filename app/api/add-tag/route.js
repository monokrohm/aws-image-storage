import getToken from "@/lib/getToken";
import { NextResponse } from "next/server";

export async function POST(req) {
    if (req.method !== "POST") {
        return NextResponse("Method not allowed", { status: 405 });
    }

    try {
        const { image_url, tag } = await req.json();
        if (!image_url || !tag) {
            return NextResponse("Image URL and Tag are required", {
                status: 400,
            });
        }

        const token = await getToken();

        const res = await fetch(
            "https://pczzuuaky5.execute-api.ap-southeast-2.amazonaws.com/api/addTag",
            {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image_url, tag }),
            }
        );

        if (!res.ok) {
            throw new Error("Failed to add tag");
        }

        const data = await res.json();
        // console.log("Tag added:", data);
        return NextResponse.json({ data });
    } catch (error) {
        console.error("Error adding tag:", error);
        return NextResponse("Error adding tag", { status: 500 });
    }
}
