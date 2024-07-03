import { NextResponse } from "next/server";
import client from "../../../../../libs/prismadb";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const { like } = await request.json();

        const data = await client.post.update({
            where: {
                id: params.id
            },
            data: {
                like,
            }
        })
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}