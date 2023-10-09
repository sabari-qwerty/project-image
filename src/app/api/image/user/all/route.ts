import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, res: Response) => {
  try {
    const data = await req.nextUrl.searchParams;

    const id = data.get("id");

    const user = await prisma.user.findUnique({
      where: {
        id: String(id),
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
