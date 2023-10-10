import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";


interface IParams {
    userId: string
}

export async function PUT(
    request: Request,
    { params }: { params: IParams }
) {

    try {
        const currentUser = await getCurrentUser();
        const { userId } = params;

        const body = await request.json();
        const {
            name,
            description,
            image
        } = body;


        if (!currentUser || currentUser.id !== userId) {
            return new NextResponse("Invalid Request");
        }


        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                description,
                image
            }
        })


        return NextResponse.json(updatedUser);
    } catch (err) {
        return new NextResponse("Internal Error", { status: 500 })
    }


}