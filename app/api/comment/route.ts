import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(
    request: Request
) {

    try {

        const currentUser = await getCurrentUser();
        if (!currentUser){
            return new NextResponse("Unauthorized",{status: 400})
        }


        const body = await request.json();
        const {
            commentBody,
            postId
        } = body;

        if(!commentBody || !postId){
            return new NextResponse("Invalid request",{status: 400})
        }

        const comment = await prisma.comment.create({
            data:{
                body: commentBody,
                post:{
                    connect:{
                        id: postId
                    }
                },
                user:{
                    connect:{
                        id: currentUser.id
                    }
                }
            },
            include:{
                user: true
            }
        });
        


        return NextResponse.json(comment);

    } catch (err) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}