import { NextResponse } from "next/server";

export async function PUT(req) {
    if (req.method !== "PUT") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    const date = new Date();

    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const binaryFile = await file.arrayBuffer();
        const buffer = Buffer.from(binaryFile);
        const id = `${year}${month}${day}-${hours}${minutes}${seconds}-${file.name}`;

        const res = await fetch(
            `https://pczzuuaky5.execute-api.ap-southeast-2.amazonaws.com/api/ito5225-image-bucket/${id}`,
            {
                method: "PUT",
                headers: {},
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
