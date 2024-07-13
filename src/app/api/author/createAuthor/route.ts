import { NextResponse } from "next/server";
import client from "../../../../libs/prismadb";

export async function POST(request: Request) {
    try {
        const { name, profileUrl } = await request.json();

        const data = await client.author.create({
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