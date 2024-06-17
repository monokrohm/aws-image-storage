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
            `https://pczzuuaky5.execute-api.ap-southeast-2.amazonaws.com/api/deleteTag`,
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
            throw new Error(
                "Failed to delete tag from image entry via API Gateway"
            );
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error("Error deleting tag:", err);
        return NextResponse.json(
            { error: "Error deleting tag" },
            { status: 500 }
        );
    }
}
