import getToken from "@/lib/getToken";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const objectKey = searchParams.get("objectKey");

    if (!objectKey) {
        throw new Error("Missing objectKey parameter");
    }

    try {
        const token = await getToken();
        const res = await fetch(
            `https://83ziy8u9fe.execute-api.ap-southeast-2.amazonaws.com/api/getSignedUrl?objectKey=${objectKey}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch signed URL");
        }

        const response = await res.json();
        // console.log("Lambda Response Data: ", response);

        const signedUrl = response.url;
        return NextResponse.json({ url: signedUrl });
    } catch (err) {
        console.error("Error fetching signed URL:", err);
        return NextResponse.json(
            { error: "Error fetching signed URL" },
            { status: 500 }
        );
    }
}
