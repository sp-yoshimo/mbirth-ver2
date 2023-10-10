"use client"

import { SafePost } from "@/app/types";
import QuestionCard from "./QuestionCard";
import { useEffect, useState } from "react";
import useQueryMode from "@/app/hooks/useQueryMode";
import { User } from "@prisma/client";
import LoginWarnModal from "../modals/LoginWarnModal";

interface QuestionListProps {
    questions: SafePost[] | null | undefined;
    currentUser?: User | null;
    showQueryText?: boolean;
}

const QuestionList: React.FC<QuestionListProps> = ({
    questions,
    currentUser,
    showQueryText
}) => {

    const query = useQueryMode();

    const [queryText, setQueryText] = useState("最新の投稿");

    useEffect(() => {

        if (query.mode === "new") setQueryText("最新の投稿")
        if (query.mode === "popular") setQueryText("人気の投稿")
        if (query.mode === "old") setQueryText("古い投稿")
        if (query.mode === "follows") setQueryText("フォローの投稿")

    }, [query.mode])




    return (
        <>
            <LoginWarnModal />
            <div className="w-full h-[91vh] overflow-y-auto pb-60">
                <div className="p-3 md:p-5">
                    {showQueryText && (
                        <div className="p-1 md:p-5 mb-5">
                            <p className="text-center font-bold text-2xl md:text-3xl">
                                {queryText}
                            </p>
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {questions?.map((item) => (
                            <QuestionCard
                                key={item.id}
                                question={item}
                                currentUser={currentUser}
                            />

                        ))}
                    </div>
                </div>
            </div>
        </>

    );
};

export default QuestionList;
