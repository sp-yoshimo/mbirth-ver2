"use client"

import Button from "@/app/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface FormProps {
    postId: string
}

const Form: React.FC<FormProps> = ({
    postId
}) => {

    const [bodyText, setBodyText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        toast.loading("送信中・・・", { id: "1" })

        await axios.post(`/api/comment/`, {
            commentBody: bodyText,
            postId
        })
            .then(() => {
                setBodyText("");
                toast.success("送信しました", { id: "1" })
                router.refresh();
            })
            .catch(() => {
                toast.error("エラーが発生しました", { id: "1" })
            })
            .finally(() => {
                setIsLoading(false);
            })


    }

    return (
        <div className="w-full">
            <form
                onSubmit={(e: React.MouseEvent<HTMLFormElement>) => { handleSubmit(e) }}
                action=""
                className="flex flex-col lg:flex-row items-center gap-4 w-full"
            >
                <textarea
                    onChange={(e) => { setBodyText(e.target.value) }}
                    className="outline-none focus:outline-none border-[1px] p-3 rounded-lg w-full lg:w-3/4 resize-none"
                    placeholder="コメントを入力(100文字以内)"
                    value={bodyText}
                />
                <div className="w-full lg:w-1/4">
                    <Button
                        isSmall
                        type="submit"
                        label="送信"
                        fullWidth
                        onClick={() => { }}
                        disabled={bodyText === "" || isLoading || bodyText.length >= 100}
                    />
                    {bodyText.length >= 100 &&(
                        <p className="text-xs text-rose-500 text-center mt-2">100文字以上は送信できません</p>
                    )}
                </div>
            </form>
        </div>
    )
};

export default Form;
