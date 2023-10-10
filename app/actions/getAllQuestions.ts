import prisma from "@/app/libs/prismadb"


const getAllQuestions = async (query: "new" | "old" | "popular" | "follows") => {
    try {

        const Basequestions = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: true
            }
        })

        if (query === "new") {

            const questions = await prisma.post.findMany({
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    user: true
                }
            })

            return questions;
        }

        if(query === "popular"){

            return Basequestions
        }

        if (query === "old") {

            const questions = await prisma.post.findMany({
                orderBy: {
                    createdAt: "asc"
                },
                include: {
                    user: true
                }
            })

            return questions;

        }

        if(query === "follows"){

            return Basequestions
        }

        return Basequestions


    } catch (error) {
        return null;
    }
}

export default getAllQuestions;