import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"

interface IParams {
    questionId?: string
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {


    const { questionId } = params;

    if (!questionId || typeof questionId !== "string") {
        throw new Error("Invalid ID")
    }


    try {
        const likeCount = await prisma.user.aggregate({
            where: {
                favoriteIds: {
                    has: questionId
                }
            },
            _count: {
                favoriteIds: true
            }
        })

        return NextResponse.json(likeCount._count.favoriteIds)

    }
    catch (err) {
        return new NextResponse("Internal Error", { status: 500 })
    }

}



export async function POST(
    request: Request,
    { params }: { params: IParams }
) {

    try {
        const currentUser = await getCurrentUser();



        if (!currentUser) {
            return NextResponse.error();
        }

        const { questionId } = params;

        if (!questionId || typeof questionId !== "string") {
            throw new Error("Invalid ID")
        }

        let favoriteIds = [...(currentUser.favoriteIds || [])]

        favoriteIds.push(questionId);

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        })

        return NextResponse.json(user);
    } catch (err) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }

        const { questionId } = params;

        if (!questionId || typeof questionId !== "string") {
            throw new Error("Invalid ID")
        }

        let favoriteIds = [...(currentUser.favoriteIds || [])]

        favoriteIds = favoriteIds.filter((id) => id !== questionId)

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        })

        return NextResponse.json(user);
    } catch (err) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}