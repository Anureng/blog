import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const { profileUrl } = await request.json();

        const data = await client.author.update({
            where: {
                id: params.id
            },
            data: {
                profileUrl
            }
        })
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}