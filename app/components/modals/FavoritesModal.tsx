"use client"

import React from "react";
import Modal from "./Modal";
import useFavoritesModal from "@/app/hooks/useFavoritesModal";
import Header from "../Header";
import { User } from "@prisma/client";
import QuestionCard from "../question/QuestionCard";
import { SafePost } from "@/app/types";

interface FavoritesModalProps {
    user: User,
    FavoriteQustions: SafePost[] | null
    currentUser: User | null;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({
    user,
    FavoriteQustions,
    currentUser
}) => {

    const favoritesModal = useFavoritesModal()

    return (
        <Modal
            isOpen={favoritesModal.isOpen}
            onClose={favoritesModal.onClose}
        >
            <div className="w-full ">
                <div>
                    <Header
                        title={user.name + "のいいねした投稿"}
                    />
                </div>
                <div className="p-2 h-[60vh] overflow-y-auto pb-10">
                    {FavoriteQustions && FavoriteQustions.length > 0 ? (
                        <div className="flex-col space-y-5">
                            {FavoriteQustions.map((question) => (
                                <QuestionCard
                                    key={question.id}
                                    question={question}
                                    currentUser={currentUser}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className=" absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                            <p className="text-xl">いいねした投稿がまだありません</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
};

export default FavoritesModal;
