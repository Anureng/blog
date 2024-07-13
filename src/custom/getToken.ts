import { cookies } from "next/headers";

export const cookie = cookies().get("accessToken")