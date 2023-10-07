import { NextResponse, } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const POST = async (req: Request, res: Response) => {
    try {
        const { id, email, img } = await req.json()

        const data = await prisma.image.create({
            data: {
                email,
                image_url: img
            }
        })

        const update_image_count = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: 'Viola the Magnificent',
            },
        })
        return NextResponse.json({ data: "update image" })

    } catch {
        return NextResponse.json({
            status: 400,
            message: "not upload db"
        })
    }
}