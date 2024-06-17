import getToken from "@/lib/getToken";
import { NextResponse } from "next/server";

export async function POST(req) {
    if (req.method !== "POST") {
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

        const res = await fetch(
            `https://pczzuuaky5.execute-api.ap-southeast-2.amazonaws.com/api/getQueryWithImage`,
            {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": file.type,
                },
                body: buffer,
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
