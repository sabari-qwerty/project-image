import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request, res: Response) => {
  try {
    return NextResponse.json({
      status: 200,
      message: "update user",
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "not upload db",
    });
  }
};
