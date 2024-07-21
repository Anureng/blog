import { redis } from "@/app/redis/redis";
import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {

        const cacheKey = `post:${params.id}`;
        const MAX_AGE = 60 * 6; // 1 hour in seconds

        // Try to fetch the data from Redis cache
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            // If data exists in the cache, return it
            return NextResponse.json(cachedData);
        }

        // If cache is empty, fetch the data from the database
        const post = await client.post.findUnique({
            where: { id: params.id },
            include: {
                comment: true, // Include related comments if needed
            },
        });

        if (!post) {
            return new NextResponse('Post not found', { status: 404 });
        }

        // Store the fetched data in Redis cache with an expiration time
        await redis.set(cacheKey, JSON.stringify(post), { ex: MAX_AGE });

        // Return the fetched data
        return NextResponse.json(post);
    } catch (error: any) {
        console.error(error);
        return new NextResponse(error.message, { status: 500 });
    } finally {
        await client.$disconnect();
    }
}
