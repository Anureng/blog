import { redis } from "@/app/redis/redis";
import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const getData = await redis.get("post")
        if (getData) {
            return NextResponse.json({ getData })
        }
        const posts = await client.post.findMany({
            include: {
                comment: true, // Include related comments if needed
            },
        });


        const MAX_AGE = 60_000 * 60;


        await redis.set("post", JSON.stringify(posts), { ex: MAX_AGE })

        return new NextResponse(JSON.stringify(posts), { status: 200 });

    } catch (error: any) {
        console.error(error);
        return new NextResponse(error.message, { status: 500 });
    } finally {
        await client.$disconnect();
    }
}