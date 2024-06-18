import getToken from "@/lib/getToken";
import { NextResponse } from "next/server";

export async function GET(req) {
    if (req.method !== "GET") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    try {
        const token = await getToken();

        const res = await fetch(
            `https://pczzuuaky5.execute-api.ap-southeast-2.amazonaws.com/api/ito5225-image-bucket`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        );

        if (!res.ok) {
            console.log("Error fetching image list:", errorText);
            return NextResponse.json(
                { error: "Image list not found" },
                { status: 404 }
            );
        }

        const xmlString = await res.text();
        // console.log("Response Text", xmlString);
        return NextResponse.json({ xmlString });
    } catch (err) {
        console.log("Error fetching image list:", err);
        return NextResponse.json(
            { error: "Error fetching image list" },
            { status: 500 }
        );
    }
}
