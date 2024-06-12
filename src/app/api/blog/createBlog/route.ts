import { NextResponse } from "next/server";
import client from "../../../../libs/prismadb";

export async function POST(request: Request) {
    try {
        const { title, img, description, like } = await request.json();



        const data = await client.post.create({
            data: {
                title,
                img,
                description,
                like,
            }
        })
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}