import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

interface IParams {
    commentId?: string
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {

    try {

        const currentUser = await getCurrentUser();
        const { commentId } = params;

        


        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId
            }
        });

        if (!currentUser || !comment || currentUser.id !== comment.userId) {
            return new NextResponse("Invalid Request", { status: 400 })
        };

        const deletedComment = await prisma.comment.delete({
            where: {
                id: commentId
            }
        });

        return NextResponse.json(deletedComment);


    } catch (err) {
        console.log(err);
        return new NextResponse("Internal Error", { status: 500 })
    }

}