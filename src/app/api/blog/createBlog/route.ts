import { NextResponse } from "next/server";
import client from "../../../../libs/prismadb";
import { getPostsFromCache, setPostsToCache } from "@/libs/cacheUtils";
import { redis } from "@/app/redis/redis";

export async function POST(request: Request) {
    try {
        const { title, img, description, like, authorId, tags, imageUrl, excerpt, slug } = await request.json();

        const newPost = await client.post.create({
            data: {
                title,
                img,
                description,
                like,
                authorId,
                tags,
                imageUrl: imageUrl ?? '', // Ensure string
                excerpt: excerpt ?? '',   // Ensure string
                slug
            }
        });
        return NextResponse.json(newPost, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
