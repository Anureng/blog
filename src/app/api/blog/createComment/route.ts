import client from "@/libs/prismadb";
import { NextResponse } from "next/server";



export async function POST(request: Request, { params }: { params: { userId: string } }) {
    try {
        const body = await request.json();
        const { name } = body;

        // Validate that the user ID and comment name are provided
        if (!name) {
            return new NextResponse("User ID and comment name are required", { status: 400 });
        }

        // Fetch the existing post to retrieve current comments
        const existingPost = await client.post.findUnique({
            where: { id: params.userId },
            include: { comment: true },
        });

        if (!existingPost) {
            return new NextResponse("Post not found", { status: 404 });
        }

        // Prepare the new comment data
        const newCommentData = {
            name: name,
            // Assuming 'authorId' needs to be associated with the comment
            postId: existingPost.id,
        };

        // Create the new comment and associate it with the post
        const newComment = await client.comment.create({
            data: newCommentData,
        });

        return new NextResponse(JSON.stringify(newComment), { status: 201 });
    } catch (error: any) {
        console.error(error);
        return new NextResponse(error.message, { status: 500 });
    } finally {
        await client.$disconnect();
    }
}
