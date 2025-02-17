import getToken from "@/lib/getToken";
import { NextResponse } from "next/server";

export async function PUT(req) {
    if (req.method !== "PUT") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
        return NextResponse.json(
            { error: "No file provided" },
            { status: 400 }
        );
    }

    try {
        const token = await getToken();

        const binaryFile = await file.arrayBuffer();
        const buffer = Buffer.from(binaryFile);
        const id = file.name;

        const res = await fetch(
            `https://pczzuuaky5.execute-api.ap-southeast-2.amazonaws.com/api/ito5225-image-bucket/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: token,
                    "Content-Type": file.type, // Required in order for the browser to display the image of a presigned URL
                },
                body: buffer,
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to upload image to S3 via API Gateway");
        }

        return NextResponse.json({ success: true, id });
    } catch (err) {
        return NextResponse.json(
            { error: "Error uploading image" },
            { status: 500 }
        );
    }
}
