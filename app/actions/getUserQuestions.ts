import prisma from "@/app/libs/prismadb"

const getUserQuestions = async (userId: string) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error("無効なユーザーID")
        }

        const questions = await prisma.post.findMany({
            where: {
                userId: userId
            },
            orderBy:{
                createdAt: "desc"
            },
            include: {
                user: true
            }
        });

        return questions;
    } catch (err) {
        console.log(err)
    }

}

export default getUserQuestions;