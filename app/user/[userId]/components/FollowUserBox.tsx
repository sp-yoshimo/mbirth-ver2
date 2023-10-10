"use client"

import Avatar from "@/app/components/Avatar";
import useFollowsModal from "@/app/hooks/useFollowsModal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

interface FollowUserBoxProps {
    FollowUser: User
}

const FollowUserBox: React.FC<FollowUserBoxProps> = ({
    FollowUser
}) => {

    const router = useRouter();
    const FollowUsersModal = useFollowsModal();

    const handleShowOtherUser = () => {
        FollowUsersModal.onClose();
        router.push(`/user/${FollowUser.id}`)
    }


    return (
        <div
            onClick={handleShowOtherUser}
            className="p-2 hover:bg-neutral-100 rounded-lg transform duration-150 cursor-pointer">
            <div className="flex items-center">
                <div>
                    <Avatar
                    user={FollowUser}
                    />
                </div>
                <div className="flex-col ml-3">
                    <div>
                        <p className="text-xl font-bold">{FollowUser.name}</p>
                    </div>
                    <div>
                        <p className="font-light">{FollowUser.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FollowUserBox;
