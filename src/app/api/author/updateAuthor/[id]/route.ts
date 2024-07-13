import { NextResponse } from "next/server";
import client from "../../../../../libs/prismadb";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const { name, profileUrl } = await request.json();

        const data = await client.author.update({
            where: {
                id: params.id
            },
            data: {
                name,
                profileUrl
            }
        })
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const data = await client.author.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}