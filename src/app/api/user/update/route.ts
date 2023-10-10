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
    const { name, email, role, picture } = await req.json();

    // const createUpdate = prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     role,
    //     picture,
    //   },
    // });

    if (name && email) {
      const exiteUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!exiteUser) {
        const createUpdate = await prisma.user.create({
          data: {
            name,
            email,
            picture,
          },
        });

        return NextResponse.json({
          status: 200,
          message: "update user",
        });
      }

      return NextResponse.json({
        status: 200,
        message: "alery exist",
      });
    }

    console.log({ name, email, role, picture });

    return NextResponse.json({
      status: 200,
      message: "update user",
    });
  } catch {
    return NextResponse.json({
      status: 400,
      message: "not upload db",
    });
  }
};
