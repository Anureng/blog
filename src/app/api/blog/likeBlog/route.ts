import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, like } = body;

        // Validate that the post ID and like are provided
        if (!id || like === undefined) {
            return new NextResponse("Post ID and like are required", { status: 400 });
        }

        // Update the like field of the existing post
        const updatedPost = await client.post.update({
            where: { id },
            data: {
                like,
            },
        });

        return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
} 