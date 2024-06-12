import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name } = body;

        // Validate that the comment ID and new name are provided
        if (!id || !name) {
            return new NextResponse("Comment ID and new name are required", { status: 400 });
        }

        // Update the existing comment
        const updatedComment = await client.comment.update({
            where: { id },
            data: {
                name,
            },
        });

        return new NextResponse(JSON.stringify(updatedComment), { status: 200 });
    } catch (error: any) {
        console.error(error);
        return new NextResponse(error.message, { status: 500 });
    } finally {
        await client.$disconnect();
    }
}
