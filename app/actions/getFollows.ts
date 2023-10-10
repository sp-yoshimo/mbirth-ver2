import prisma from "@/app/libs/prismadb"

const getFollows = async(userId: string) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return null;
        }

        const followUsers = [];
        for(const id of user.followIds){
            const Followuser = await prisma.user.findUnique({
                where:{
                    id
                }
            });

            if(Followuser){
                followUsers.push(Followuser);
            }
        }


        return followUsers.reverse();

    } catch (error) {
        console.log(error);
        return null;
    }

}


export default getFollows;