"use client"

import { SafePost } from "@/app/types";
import React, { useState } from "react";
import Button from "../Button";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";
import HeartButton from "../HeartButton";
import { User } from "@prisma/client";
import axios from "axios";
import useFavoritesModal from "@/app/hooks/useFavoritesModal";


interface QuestionCardProps {
    question: SafePost,
    currentUser?: User | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    currentUser
}) => {

    const router = useRouter();

    const [likeCount, setLikeCount] = useState(0);
    const favoritesQuestionsModal = useFavoritesModal();

    const handleCloseFavoritesModal = () => {
        favoritesQuestionsModal.onClose();
        router.push(`/question/${question.id}`)
    }

    axios.get(`/api/favorites/${question.id}`)
        .then((res) => {
            
            setLikeCount(res.data)
        })
        .catch(error => console.log(error))


    return (
        <div className="bg-white border-[1px] shadow-xl hover:shadow-lg transform duration-150 p-4 rounded-lg relative max-h-[250px]">
            <div className="flex-col items-start justify-start">

                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-black font-bold text-2xl">
                            {question.title.slice(0,8)}...
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <HeartButton
                            questionId={question.id}
                            currentUser={currentUser}
                        />
                        <div className="ml-1 text-sm font-light pb-[2px]">
                            {likeCount}
                        </div>
                    </div>
                </div>

                <div className="mt-4 min-h-[60px]">
                    <p>
                        {question.question.length > 30 ? (
                            <span>{question.question.slice(0, 30)}...</span>
                        ) : (
                            <span>{question.question}</span>
                        )}
                    </p>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center  p-2 pl-1 rounded-lg hover:bg-neutral-100 cursor-pointer transform duration-150"
                            onClick={() => { router.push(`/user/${question.user.id}`) }}
                        >
                            <Avatar
                                user={question.user}
                                onClick={() => { }}
                            />
                            <p className="font-light text-sm ml-2">{question.user.name}</p>
                        </div>
                        <div>
                            <Button
                                label="見に行く"
                                onClick={handleCloseFavoritesModal}
                                type="button"
                                isSmall
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default QuestionCard;
