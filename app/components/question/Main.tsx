"use client"

import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import Sidebar from "../sidebar/Sidebar";
import PostModal from "../modals/PostModal";
import MobileSidebar from "../sidebar/MobileSidebar";
import { SafePost } from "@/app/types";
import LoginWarnModal from "../modals/LoginWarnModal";
import { User } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import useQueryMode from "@/app/hooks/useQueryMode";
import Loading from "../Loading";

interface MainProps {
    hasSidebar?: boolean;
    currentUser?: User | null;
}

const Main: React.FC<MainProps> = ({
    hasSidebar,
    currentUser
}) => {

    const [questions, setQuestions] = useState<SafePost[]>([]);

    const queryMode = useQueryMode();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const getQuestions = async (query: "new" | "popular" | "old" | "follows") => {

            setIsLoading(true)

            await axios.get(`/api/allquestions/${query}`)
                .then((res) => {
                    console.log(res);

                    setQuestions(res.data)
                })
                .catch(() => {
                    toast.error("データの取得に失敗しました")
                })
                .finally(() => {
                    // console.log(questions);
                    setIsLoading(false)
                })

        }

        getQuestions(queryMode.mode);

    }, [queryMode.mode])


    return (
        <>
            <PostModal />
            <LoginWarnModal />
            <div className="flex w-full relative">
                {hasSidebar ? (
                    <>
                        <div className="hidden xl:block w-1/5">
                            <Sidebar />
                        </div>
                        <div className="fixed bottom-0 left-0 w-full block xl:hidden z-50">
                            <MobileSidebar />
                        </div>
                        {isLoading === false ? (
                            <div className="w-full xl:w-4/5">
                                {queryMode.mode === "follows" && questions.length < 1 ? (
                                    <div className="flex items-center justify-center w-full xl:w-4/5 h-[80vh]">
                                        <p className="text-xl">フォロー中のユーザーがいません</p>
                                    </div>
                                ) : (
                                    <QuestionList
                                        questions={questions}
                                        currentUser={currentUser}
                                        showQueryText
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full xl:w-4/5 h-[80vh]">
                                <Loading />
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {isLoading === false ? (
                            <div className="w-full">
                                {queryMode.mode === "follows" && questions.length < 1 ? (
                                    <div className="flex items-center justify-center w-full xl:w-4/5 h-[80vh]">
                                        <p className="text-xl">フォロー中のユーザーがいません</p>
                                    </div>
                                ) : (
                                    <QuestionList
                                        questions={questions}
                                        currentUser={currentUser}
                                        showQueryText
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full xl:w-4/5 h-[80vh]">
                                <Loading />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    )
};

export default Main;
