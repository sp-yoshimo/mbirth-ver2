"use client"

import React from "react";
import Form from "./Form";
import { SafeComment } from "@/app/types";
import CommentList from "./CommentList";
import { User } from "@prisma/client";

interface CommentContainerProps {
    postId: string,
    comments: SafeComment[] | null;
    currentUser: User | null;
}

const CommentContainer: React.FC<CommentContainerProps> = ({
    postId,
    comments,
    currentUser
}) => {
    return (
        <div className="w-full xl:w-3/5 mx-auto p-3 pb-10">
            <div>
                <Form
                    postId={postId}
                />
            </div>
            <div className="mt-10 pb-36">
                <div>
                    <p className="text-3xl font-bold text-center mb-10">コメント一覧</p>
                </div>
                {comments && comments?.length > 0 ? (
                    <div>
                        <CommentList
                        comments={comments}
                        currentUser={currentUser}
                        />
                    </div>
                ) : (
                    <div className=" flex justify-center items-center h-[20vh]">
                        <p className="text-xl">まだコメントはありません</p>
                    </div>
                )}
            </div>
        </div>
    )
};

export default CommentContainer;
