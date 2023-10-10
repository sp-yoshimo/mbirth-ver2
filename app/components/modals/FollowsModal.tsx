"use client"

import React from "react";
import Modal from "./Modal";
import useFollowsModal from "@/app/hooks/useFollowsModal";
import { User } from "@prisma/client";
import Header from "../Header";
import FollowUserBox from "@/app/user/[userId]/components/FollowUserBox";

interface FollowModalProps {
    user: User;
    FollowUsers: User[] | null;
}

const FollowsModal: React.FC<FollowModalProps> = ({
    user,
    FollowUsers
}) => {

    const followsModal = useFollowsModal();

    return (
        <Modal
            isOpen={followsModal.isOpen}
            onClose={followsModal.onClose}
        >
            <div className="w-full">
                <div>
                    <Header
                        title={user.name + "のフォローユーザー"}
                    />
                </div>
                <div className="p-2 h-[60vh] overflow-y-auto pb-10">
                    {FollowUsers && FollowUsers.length > 0 ? (
                        <div className="flex-col space-y-4">
                            {FollowUsers.map((user)=>(
                                <FollowUserBox
                                key={user.id}
                                FollowUser={user}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className=" absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                            <p className="text-xl">フォロー中のユーザーがいません</p>
                        </div>
                    )}
                </div>
            </div>

        </Modal>
    )
};

export default FollowsModal;
