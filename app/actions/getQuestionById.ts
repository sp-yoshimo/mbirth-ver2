import prisma from "@/app/libs/prismadb"

const getQuestionById = async(questionId: string) => {

    try{

        const question = await prisma.post.findUnique({
            where:{
                id: questionId
            },
            include:{
                user: true
            }
        });

        if(!question){
            return null;
        }

        return question;

    }catch(error){
        console.log(error);
        return null;
    }

}

export default getQuestionById