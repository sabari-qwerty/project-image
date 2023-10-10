export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisam = new PrismaClient();

export const GET = async (req: NextRequest, res: Response) => {
  try {
    const data = await req.nextUrl.searchParams;

    const email = data.get("email");

    // const user = await prisam.user.

    // console.log(user);

    const user = await prisam.user.findUnique({
      where: {
        email: String(email).replaceAll('"', ""),
      },
    });

    if (!user) {
      return NextResponse.json({
        state: 404,
        message: "user not found",
      });
    }

    return NextResponse.json({
      data: user,
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: err,
    });
  }
  //   try {
  //     const { email } = await req.json();

  //     console.log(email);

  //     return NextResponse.json({
  //       data: email,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
};
