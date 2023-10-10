"use client"

import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";
import { User } from "@prisma/client";


interface HeartButtonProps {
    questionId: string;
    currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    questionId,
    currentUser,
}) => {

    const { toggleFavorite, hasFavorited } = useFavorite(questionId, currentUser);


    return (
        <>
            <div className=" cursor-pointer"
                onClick={toggleFavorite}
            >
                {hasFavorited ? (
                    <AiFillHeart size={23} className="text-rose-500" />
                ) : (
                    <AiOutlineHeart size={23} className="text-black" />
                )}
            </div>
        </>
    )
};

export default HeartButton;
