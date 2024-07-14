import { redis } from "@/app/redis/redis";

// Define a type for the post data
type Post = {
    id: string;
    title: string;
    img: string;
    description: string;
    like: number;
    authorId: string;
    tags: string[];
    imageUrl: string | null;
    excerpt: string | null;
    slug: string;
};

// Define a type for the cache data, which is an array of posts
type PostCache = Post[];

// Function to get posts from cache
export async function getPostsFromCache(cacheKey: string): Promise<PostCache | null> {
    const cachedPosts = await redis.get(cacheKey) as string | null; // Ensure redis.get returns a string or null

    if (cachedPosts) {
        return JSON.parse(cachedPosts) as PostCache;
    }

    return null;
}

// Function to set posts to cache
export async function setPostsToCache(cacheKey: string, posts: PostCache): Promise<void> {
    await redis.set(cacheKey, JSON.stringify(posts)); // Ensure redis.set accepts a string
}
