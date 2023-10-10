import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(
    request: Request
){
    try{

        const  body  = await request.json();

        const {
            title,
            question,
            image,
            answer
        } = body;

        const currentUser = await getCurrentUser();

        if(!currentUser){
            return new NextResponse("Unauthorized",{status:400})
        }

        if(!title){
            return new NextResponse("タイトルを入力してください",{status:400})
        }
        if(!question){
            return new NextResponse("問題文を入力してください",{status:400})
        }
        if(!answer){
            return new NextResponse("解答を入力してください",{status:400})
        }


        const newQuestion = await prisma.post.create({
            data:{
                title,
                question,
                image: image,
                answer,
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

        return NextResponse.json(newQuestion);
 
    }catch(error){
        console.log(error);
        return new NextResponse("Internal Error", {status: 500})
    }
}