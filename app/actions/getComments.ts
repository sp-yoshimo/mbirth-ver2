import prisma from "@/app/libs/prismadb";
import { SafeComment } from "@/app/types";

const getComments = async (postId: string) => {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: true
            }

        });

        if (!comments) {
            return null;
        }



        return comments

    } catch (err) {
        console.error(err);
        return null;
    }
};

export default getComments;