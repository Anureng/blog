import { NextResponse } from "next/server";
import client from "../../../../../libs/prismadb";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const { title, img, description, like, authorId, tags, imageUrl, excerpt, slug } = await request.json();

        const data = await client.post.update({
            where: {
                id: params.id
            },
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
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const data = await client.post.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}