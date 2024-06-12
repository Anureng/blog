import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const posts = await client.post.findMany({
            include: {
                comment: true, // Include related comments if needed
            },
        });

        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (error: any) {
        console.error(error);
        return new NextResponse(error.message, { status: 500 });
    } finally {
        await client.$disconnect();
    }
}