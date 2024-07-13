import { NextResponse } from "next/server";
import client from "../../../../libs/prismadb";
import jwt from "jsonwebtoken"
import { setCookie } from "nookies";

const JWT_SECRET = "ahfkgfkwkfkwrkfwruifuigrccceigniergncegfiwgfiwgiugfwiwiurgi"

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!name && !email) {
            return NextResponse.json("Write both email and password", { status: 300 })
        }



        const data = await client.user.create({
            data: {
                name,
                email,
                password
            }
        })


        const tokenPayload = {
            id: data.id,
            name: data.name
        }
        const accessToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "15m" })
        const response = NextResponse.json({ data, accessToken }, { status: 201 });
        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: '/',
        });

        return response;
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}