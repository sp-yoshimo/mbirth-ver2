import { User } from "@prisma/client";
import useLoginWarnModal from "./useLoginWarnModal";
import { useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AiFillHeart } from "react-icons/ai";

export const useFavorite = (
    questionId: string,
    currentUser?: User | null
) => {

    const loginWarnModal = useLoginWarnModal();
    const router = useRouter();

    const hasFavorited = useMemo(() => {

        const list = currentUser?.favoriteIds || []

        return list.includes(questionId);

    }, [currentUser, questionId])


    const toggleFavorite = async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {



        e.stopPropagation();

        if (!currentUser) {
            return loginWarnModal.onOpen();
        }

        try {

            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api//favorites/${questionId}`)
            } else {
                request = () => axios.post(`/api/favorites/${questionId}`)
                toast("いいねしました", {
                    icon: <AiFillHeart size={24} className="text-rose-500" />,
                    position: "top-right",
                    id: questionId,
                    
                })
            }

            await request();
            router.refresh();


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }

    }


    return {
        hasFavorited,
        toggleFavorite
    }

}


export default useFavorite;