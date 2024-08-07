import { redis } from "@/app/redis/redis";
import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const cacheKey = "post";
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            // If data exists in the cache, return it
            console.log("Coming For Cache");

            return NextResponse.json(cachedData);
        }

        // If cache is empty, fetch the data from the database
        const posts = await client.post.findMany({
            include: {
                comment: true, // Include related comments if needed
            },
        });

        // Store the fetched data in Redis cache with an expiration time
        await redis.set(cacheKey, JSON.stringify(posts));
        await redis.expire(cacheKey, 60)
        // Return the fetched data
        return NextResponse.json(posts);
    } catch (error: any) {
        console.error(error);
        return new NextResponse(error.message, { status: 500 });
    }
}
