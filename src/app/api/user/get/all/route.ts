import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: Request, res: Response) => {
  const data = await prisma.user.findMany();
  return NextResponse.json({ data: data });
};
