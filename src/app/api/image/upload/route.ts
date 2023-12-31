export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request, res: Response) => {
  try {
    const { email, img } = await req.json();

    const data = await prisma.image.create({
      data: {
        email,
        image_url: img,
      },
    });

    // const d = await prisma.user.findMany({
    //   where: {
    //     email: email,
    //   },
    // });

    // const update_image_count = await prisma.user.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     name: "Viola the Magnificent",
    //   },
    // });
    return NextResponse.json({ data: "update image" });
  } catch {
    return NextResponse.json({
      status: 400,
      message: "not upload db",
    });
  }
};
