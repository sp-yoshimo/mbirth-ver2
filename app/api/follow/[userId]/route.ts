import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

interface IParams {
    userId: string
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
){

    try {
        const currentUser = await getCurrentUser();
        const { userId } = params;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!currentUser) {
            return new NextResponse("Unautorized", { status: 400 })
        }

        if (!user) {
            return new NextResponse("Invalid ID", { status: 400 })
        };

        const updatedList = [...currentUser.followIds, userId]

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followIds: updatedList
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {

        console.log(error)
        return NextResponse.json({ "error": error });
    }

}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
){

    try {
        const currentUser = await getCurrentUser();
        const { userId } = params;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!currentUser) {
            return new NextResponse("Unautorized", { status: 400 })
        }

        if (!user) {
            return new NextResponse("Invalid ID", { status: 400 })
        };

        const updatedList = currentUser.followIds.filter((id) => id !== userId);

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followIds: updatedList
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {

        console.log(error)
        return NextResponse.json({ "error": error });
    }

}

