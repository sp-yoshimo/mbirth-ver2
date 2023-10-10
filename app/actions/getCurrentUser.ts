import prisma from "@/app/libs/prismadb"

import getSession from "./getSession"

const getCurrentUser = async() => {
    try{

        const session = await getSession();

        if(!session?.user?.email){
            return null;
        }

        const currentuser = await prisma.user.findUnique({
            where:{
                email: session.user.email
            }
        });

        if(!currentuser){
            return null;
        }

        return currentuser;


    }catch(error){
        return null;
    }
}

export default getCurrentUser