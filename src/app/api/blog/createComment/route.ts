import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, postId, Description } = body;

        // Validate that the user ID, post ID, and comment name are provided
        if (!postId || !name) {
            return new NextResponse("User ID, Post ID, and comment name are required", { status: 400 });
        }

        // Fetch the existing post to ensure it exists
        const existingPost = await client.post.findUnique({
            where: { id: postId },
            include: { comment: true },
        });

        if (!existingPost) {
            return new NextResponse("Post not found", { status: 404 });
        }

        // Create the new comment and associate it with the post
        const newComment = await client.comment.create({
            data: {
                name: name,
                postId: postId,
                Description: Description
            },
        });

        return new NextResponse(JSON.stringify(newComment), { status: 201 });
    } catch (error: any) {
        console.error(error);
        return new NextResponse(error.message, { status: 500 });
    } finally {
        await client.$disconnect();
    }
}
