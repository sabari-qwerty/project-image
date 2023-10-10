export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, res: Response) => {


    try {
        const data = await req.nextUrl.searchParams;

        const email = data.get("email");

        const user = await prisma.user.findUnique({
            where: {
                email: String(email),
            },
        });

        if (!user) {
            return NextResponse.json({
                state: 404,
                message: "user not found",
            });
        }

        const allImage = await prisma.image.findMany({
            where: {
                email: user.email,
            },
        });

        return NextResponse.json({
            data: allImage,
        });
    } catch (err) {
        return NextResponse.json({
            status: 400,
            message: err,
        });
    }
};