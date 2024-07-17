import { NextResponse } from "next/server";
import client from "../../../../libs/prismadb";
import jwt from "jsonwebtoken"
import { setCookie } from "nookies";

const JWT_SECRET = "ahfkgfkwkfkwrkfwruifuigrccceigniergncegfiwgfiwgiugfwiwiurgi"

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!password && !email) {
            return NextResponse.json("Write both email and password", { status: 300 })
        }

        const existUser = await client.user.findUnique({
            where: { email }
        })

        if (!existUser) {
            return NextResponse.json({ message: "First Create User" }, { status: 201 });
        }

        if (email != existUser.email && password != existUser.password) {
            return NextResponse.json({ message: "Wrong Password" }, { status: 400 });
        }


        const tokenPayload = {
            id: existUser.id,
            name: existUser.name,
            email: existUser.email
        }
        const accessToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "15s" })
        const response = NextResponse.json({ existUser, accessToken }, { status: 200 });
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

