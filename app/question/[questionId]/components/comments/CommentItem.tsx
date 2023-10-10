"use client"

import Avatar from "@/app/components/Avatar";
import { SafeComment } from "@/app/types";
import { User } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";


interface CommentItemProps {
    comment: SafeComment | null;
    currentUser: User | null;
    isOwn?: boolean
}

const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    currentUser,
    isOwn
}) => {

    const router = useRouter();


    const createdDate = useMemo(() => {

        if (comment?.createdAt) {
            return format(comment?.createdAt, "yyyy/MM/dd HH:MM")
        }

        return ""

    }, [])

    const [isLoading, setIsLoading] = useState(false);

    const handleCommentDelete = async () => {

        setIsLoading(true);
        toast.loading("コメント削除中・・・", { id: "1" })

        await axios.delete(`/api/comment/${comment?.id}`)
            .then(() => {
                toast.success("コメントを削除しました", { id: "1" })
                router.refresh();
            })
            .catch((err) => {
                console.log(err);
                toast.error("エラーが発生しました", { id: "1" });
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    return (
        <div>
            {comment && (
                <div className="flex items-start gap-2">
                    <div>
                        <Avatar
                            user={comment?.user}
                            onClick={() => { router.push(`/user/${comment.user?.id}`) }}
                        />
                    </div>
                    <div className="flex-col w-auto whitespace-wrap max-w-[500px]">
                        <div className="mb-1">
                            <p className="text-sm text-gray-500">{comment.user?.name}</p>
                        </div>

                        <div className="rounded-lg bg-sky-100 text-black  px-4 py-2">
                            <p className="">{comment.body}</p>
                        </div>

                        <div className="mt-1">
                            <div className="flex items-center">
                                <p className="text-xs text-gray-400">{createdDate}</p>
                                {isOwn && (
                                    <div
                                        onClick={handleCommentDelete}
                                        className="ml-4 cursor-pointer">
                                        <button
                                            disabled={isLoading}
                                            className=" disabled:cursor-not-allowed"
                                        >
                                            <p className="text-xs text-gray-400 underline">削除</p>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default CommentItem;
