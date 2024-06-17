import getToken from "@/lib/getToken";
import { NextResponse } from "next/server";

//Single Image
export async function GET(req) {
    if (req.method !== "GET") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    const { searchParams } = new URL(req.url);
    const objectKey = searchParams.get("key");
    // console.log("ID ", id);

    try {
        const token = await getToken();

        const res = await fetch(
            `https://pczzuuaky5.execute-api.ap-southeast-2.amazonaws.com/api/ito5225-image-bucket/${objectKey}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "image/jpeg",
                },
            }
        );

        if (!res.ok) {
            console.log("Error fetching image:", errorText);
            return NextResponse.json(
                { error: "Image not found" },
                { status: 404 }
            );
        }

        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");
        const dataUri = `data:image/jpeg;base64,${base64Image}`;

        return NextResponse.json({ dataUri });
    } catch (err) {
        console.log("Error fetching image:", err);
        return NextResponse.json(
            { error: "Error fetching image" },
            { status: 500 }
        );
    }
}
