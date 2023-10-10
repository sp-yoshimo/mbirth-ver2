import prisma from "@/app/libs/prismadb"


const getUserById = async(id: string) => {
    try{

        const user = await prisma.user.findUnique({
            where:{
                id: id
            }
        })


        return user

    }catch(error){
        console.log(error);
    }
}

export default getUserById;