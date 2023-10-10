import prisma from "@/app/libs/prismadb"

const getKeywordQuestions = async (keyword: string) => {

    try {

        const questions = await prisma.post.findMany({
            where: {
                title: {
                    contains: keyword
                }
            }
        })

        return questions;

    } catch (err) {
        console.log(err);
        return null;
    }

}


export default getKeywordQuestions;