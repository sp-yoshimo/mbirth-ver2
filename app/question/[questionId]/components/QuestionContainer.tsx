"use client"

import Button from "@/app/components/Button";
import { SafePost } from "@/app/types";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { TiDelete } from "react-icons/ti"
import HeartButton from "@/app/components/HeartButton";
import axios from "axios";
import Avatar from "@/app/components/Avatar";
import { useRouter } from "next/navigation";
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import useQuestionEditModal from "@/app/hooks/useQuestionEditModal";
import useQuestionDeleteModal from "@/app/hooks/useQuestionDeleteModal";

interface QuestionContainerProps {
    question: SafePost | null
    currentUser: User | null
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({
    question,
    currentUser
}) => {

    const [hasAnswerShowed, setHasAnswerShowed] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const questionEditModal = useQuestionEditModal();
    const questionDeleteModal = useQuestionDeleteModal();

    const router = useRouter();

    axios.get(`/api/favorites/${question?.id}`)
        .then((res) => {

            setLikeCount(res.data)
        })
        .catch(error => console.log(error))


    const createdDate = useMemo(() => {

        if (question?.createdAt) {
            return format(question?.createdAt, "yyyy年MM月dd日 HH:mm")
        } else {
            return ""
        }

    }, [question?.createdAt])

    if (!question) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className="bg-white border-[1px] shadow-xl rounded-xl overflow-hidden p-4 lg:p-10">
            <div className="flex-col space-y-5">

                <div className="flex flex-col gap-5 lg:flex-row items-start lg:justify-between lg:gap-20">
                    <div className="flex flex-col items-start w-full">
                        <div className="mb-3">
                            <p className="text-3xl  lg:text-5xl font-bold">{question.title}</p>
                        </div>
                        <div>
                            <p className="text-lg text-gray-800 lg:text-xl font-semibold">{question.question}</p>
                        </div>
                    </div>

                    {question.image && (
                        <div className="">
                            <Image
                                src={question.image}
                                alt="image"
                                width={600}
                                height={400}
                                className="w-[700px] h-[250px] object-cover"
                            />
                        </div>
                    )}
                </div>

                <hr />

                <div className="py-3">
                    {hasAnswerShowed ? (
                        <div className="flex-col items-start">
                            <div>
                                <p className="text-2xl font-semibold">解答・解説</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-lg">{question.answer}</p>
                            </div>
                            <div
                                onClick={() => { setHasAnswerShowed(false) }}
                                className="mt-4 cursor-pointer">
                                <p className="flex items-center hover:text-neutral-500 transform duration-150">
                                    <span className="mr-[2px]">
                                        <TiDelete />
                                    </span>
                                    解説を非表示にする
                                </p>
                            </div>
                        </div>
                    ) : (
                        <Button
                            label="答えを見る"
                            onClick={() => { setHasAnswerShowed(true) }}
                            type="button"
                        />
                    )}
                </div>

                <hr className="" />

                <div className="flex-col">
                    <div className="flex items-center space-x-10 mb-5">
                        <div className="flex items-center gap-[2px]">
                            <HeartButton
                                questionId={question.id}
                                currentUser={currentUser}
                            />
                            <p className="pb-[2px]">{likeCount}</p>
                        </div>
                        <div
                            onClick={() => { router.push(`/user/${question.user.id}`) }}
                            className="flex items-center hover:bg-neutral-100 p-2 rounded-lg transform duration-150 cursor-pointer">
                            <Avatar
                                user={question.user}
                            />
                            <p className="ml-1">{question.user.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm md:text-base">{createdDate}に投稿</p>
                        </div>
                        {currentUser?.id === question.user.id && (
                            <div className="flex items-center gap-5">
                                <div
                                    onClick={() => { questionEditModal.onOpen() }}
                                    className=" hover:bg-green-100 p-3 rounded-full cursor-pointer hover:scale-110 transform duration-200 hover:text-green-800">
                                    <AiFillEdit />
                                </div>
                                <div
                                    onClick={() => { questionDeleteModal.onOpen() }}
                                    className="hover:bg-rose-100 p-3 rounded-full cursor-pointer hover:scale-110 transform duration-200 hover:text-rose-800">
                                    <AiFillDelete />
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </div>
    )
};

export default QuestionContainer;
