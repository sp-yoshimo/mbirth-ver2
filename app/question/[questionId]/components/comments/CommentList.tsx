"use client"

import { SafeComment } from "@/app/types";
import React, { useState } from "react";
import CommentItem from "./CommentItem";
import { User } from "@prisma/client";
import Button from "@/app/components/Button";

interface CommentListProps {
    comments: SafeComment[];
    currentUser: User | null
}

const CommentList: React.FC<CommentListProps> = ({
    comments,
    currentUser
}) => {

    const [isShowAllComments, setIsAhowAllComments] = useState(false);

    return (
        <div className="p-1">
            {isShowAllComments ? (
                <div className="flex-col space-y-7">
                    {comments.map((comment) => (
                        <CommentItem
                            comment={comment}
                            key={comment.id}
                            currentUser={currentUser}
                            isOwn={currentUser?.id === comment.user?.id}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex-col space-y-7">
                    {comments.slice(0, 5).map((comment) => (
                        <CommentItem
                            comment={comment}
                            key={comment.id}
                            currentUser={currentUser}
                            isOwn={currentUser?.id === comment.user?.id}
                        />
                    ))}
                    {comments.length > 5 && (
                        <Button
                            label="もっと見る"
                            onClick={() => { setIsAhowAllComments(true) }}
                            type="button"
                            isSmall
                        />
                    )}
                </div>
            )}
        </div>
    )
};

export default CommentList;
