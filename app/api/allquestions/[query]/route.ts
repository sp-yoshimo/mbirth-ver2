import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserQuestions from "@/app/actions/getUserQuestions";
import prisma from "@/app/libs/prismadb"
import { SafePost } from "@/app/types";
import { NextResponse } from "next/server";

interface IParams {
    query?: "new" | "old" | "popular" | "follows"
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const currentUser = await getCurrentUser();

        const baseQuestions = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: true
            }
        });

        const { query } = params;


        //最新の投稿
        if (query === "new") {
            return NextResponse.json(baseQuestions)
        };


        //古い順の投稿
        if (query === "old") {

            const questions = await prisma.post.findMany({
                orderBy: {
                    createdAt: "asc"
                },
                include: {
                    user: true
                }
            });

            return NextResponse.json(questions);
        }


        //いいね数が多い順の投稿
        if (query === "popular") {

            const idAndFavoriteNumList: any[] = [];

            //すべての投稿をforで展開
            for (const item of baseQuestions) {

                const likeCount = await prisma.user.aggregate({
                    where: {
                        favoriteIds: {
                            has: item.id
                        }
                    },
                    _count: {
                        favoriteIds: true
                    }
                })


                //{id: 投稿id, likeCount: その投稿に対するいいね数}というオブジェクトを作成して配列にpush
                const idAndFavoriteNumData: any = {}
                idAndFavoriteNumData["id"] = item.id;
                idAndFavoriteNumData["likeCount"] = likeCount._count.favoriteIds

                idAndFavoriteNumList.push(idAndFavoriteNumData)

            }

            //いいね順に配列を並び替え
            const updatedIdAndFavoriteIdsList = idAndFavoriteNumList.sort((a, b) => {
                return (a.likeCount < b.likeCount) ? 1 : -1;
            });


            //[{id: id, likeCount: number},{}..]配列を投稿の配列に直す
            const returnQuestionList = [];
            for (const item of updatedIdAndFavoriteIdsList) {

                const question = await prisma.post.findUnique({
                    where: {
                        id: item.id
                    },
                    include: {
                        user: true
                    }
                });

                if (question) {
                    returnQuestionList.push(question);
                }

            }

            return NextResponse.json(returnQuestionList);
        }



        //フォローユーザーの投稿
        if (query === "follows") {

            const FollowsQuestions: any[] = [];

            if (currentUser?.followIds) {

                //フォローユーザーを一人づつfor展開。そのユーザーの投稿を取得
                for (const followId of currentUser.followIds) {

                    const followUsersQuestions = await getUserQuestions(followId);

                    if (followUsersQuestions && followUsersQuestions?.length > 0) {
                        FollowsQuestions.push(...followUsersQuestions)
                    }

                }

            }


            //最新の投稿順に並び替える
            const returnFollowsQuestions = FollowsQuestions.sort((a,b)=>{
                return a.createdAt < b.createdAt ? 1 : -1
            })


            return NextResponse.json(returnFollowsQuestions);
        }


    } catch (err) {
        console.log(err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}