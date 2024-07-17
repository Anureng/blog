import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const { Author } = await request.json();

        const findUser = await client.user.findUnique({
            where: { id: params.id }
        })

        if (!findUser) {
            return NextResponse.json("Not find User", { status: 404 });
        }

        const data = await client.user.update({
            where: {
                id: params.id
            },
            data: {
                Author
            }
        })
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}