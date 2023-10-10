import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

interface IParams {
    questionId: string
}

export async function PUT(
    request: Request,
    { params }: { params: IParams }
) {

    try {
        const currentUser = await getCurrentUser();
        const { questionId } = params;

        const question = await prisma.post.findUnique({
            where: {
                id: questionId
            },
            include: {
                user: true
            }
        });

        if (!currentUser || currentUser.id !== question?.user.id) {
            return new NextResponse("Invalid Request", { status: 400 })
        }

        const body = await request.json();
        const {
            title,
            question: questionBody,
            image,
            answer
        } = body;

        if (!title) {
            return new NextResponse("タイトルを入力してください", { status: 400 })
        }
        if (!questionBody) {
            return new NextResponse("問題文を入力してください", { status: 400 })
        }
        if (!answer) {
            return new NextResponse("解答を入力してください", { status: 400 })
        }

        const updatedQuestion = await prisma.post.update({
            where: {
                id: question.id
            },
            data: {
                title,
                question: questionBody,
                image,
                answer
            }
        })

        return NextResponse.json(updatedQuestion);

    } catch (err) {
        console.log(err);
        return new NextResponse("Internal Error", { status: 500 })
    }

}




export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const currentUser = await getCurrentUser();
        const { questionId } = params;

        const question = await prisma.post.findUnique({
            where: {
                id: questionId
            },
            include: {
                user: true
            }
        });

        if (!currentUser || currentUser.id !== question?.user.id) {
            return new NextResponse("Invalid Request", { status: 400 })
        }

        const deletedQuestion = await prisma.post.delete({
            where:{
                id: questionId
            }
        });

        return NextResponse.json(deletedQuestion);

    } catch (err) {
        console.log(err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}