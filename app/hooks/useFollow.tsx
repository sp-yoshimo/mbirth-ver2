import { User } from "@prisma/client";
import useLoginWarnModal from "./useLoginWarnModal";
import { useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri"


export const useFollow = (
    userId: string,
    currentUser?: User | null
) => {

    const loginWarnModal = useLoginWarnModal();
    const router = useRouter();

    const hasFollowed = useMemo(() => {

        const list = currentUser?.followIds || []


        return list.includes(userId);

    }, [currentUser, userId])


    const toggleFollow = async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {



        e.stopPropagation();

        if (!currentUser) {
            return loginWarnModal.onOpen();
        }

        try {

            let request;

            if (hasFollowed) {
                request = () => axios.delete(`/api/follow/${userId}`)
                toast("フォロー解除しました", {
                    icon: <RiUserUnfollowFill size={24} className="text-black" />,
                    position: "top-right",
                        id: userId,
                })

            } else {
                request = () => axios.post(`/api/follow/${userId}`)
                toast("フォローしました", {
                    icon: <RiUserFollowFill size={24} className="text-sky-500" />,
                    position: "top-right",
                    id: userId,
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
        hasFollowed,
        toggleFollow
    }

}


export default useFollow;