import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import client from "@/libs/prismadb"



export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {

        const data = await client.user.findUnique({
            where: { id: params.id },
        })
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}