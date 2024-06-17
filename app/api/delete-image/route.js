import getToken from "@/lib/getToken";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    if (req.method !== "DELETE") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    const { searchParams } = new URL(req.url);
    const objectKey = searchParams.get("objectKey");

    if (!objectKey) {
        throw new Error("Missing objectKey parameter");
    }

    try {
        const token = await getToken();

        const res = await fetch(
            `https://pczzuuaky5.execute-api.ap-southeast-2.amazonaws.com/api/ito5225-image-bucket/${objectKey}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to delete image from S3 via API Gateway");
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Error deleting image:", err);
        return NextResponse.json(
            { error: "Error deleting image" },
            { status: 500 }
        );
    }
}
