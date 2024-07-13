import { NextResponse } from "next/server";
import client from "../../../../libs/prismadb";
import { redis } from "@/app/redis/redis";

export async function POST(request: Request) {
    try {
        const { title, img, description, like, authorId, tags, imageUrl, excerpt, slug } = await request.json();

        const data = await client.post.create({
            data: {
                title,
                img,
                description,
                like,
                authorId,
                tags,
                imageUrl,
                excerpt,
                slug
            }
        })

        const cacheKey = "post";
        const MAX_AGE = 10; // 1 hour in seconds

        const cachedData = await redis.get(cacheKey);
        await redis.set(cacheKey, JSON.stringify(cachedData), { ex: MAX_AGE });
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}