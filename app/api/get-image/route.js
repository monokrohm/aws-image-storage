import { NextResponse } from "next/server";

//Single Image
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("key");
    // console.log("ID ", id);

    const res = await fetch(
        `https://ito5225-image-bucket.s3.ap-southeast-2.amazonaws.com/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "image/jpeg",
            },
        }
    );

    if (!res.ok) {
        console.log("Error fetching image:", errorText);
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");
    const dataUri = `data:image/jpeg;base64,${base64Image}`;

    return NextResponse.json({ dataUri });
}
