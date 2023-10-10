"use client"

import useQuestionDeleteModal from "@/app/hooks/useQuestionDeleteModal";
import React, { useState } from "react";
import Modal from "./Modal";
import { SafePost } from "@/app/types";
import Header from "../Header";
import Button from "../Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface QuestionDeleteModalProps {
    question: SafePost | null;
}

const QuestionDeleteModal: React.FC<QuestionDeleteModalProps> = ({
    question
}) => {

    const questionDeleteModal = useQuestionDeleteModal();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleDelete = async() => {

        setIsLoading(true)
        toast.loading("削除中・・・",{id: "1"})

        await axios.delete(`/api/question/${question?.id}`)
        .then(()=>{
            toast.success("削除しました",{id: "1"})
            window.location.href="/"
        })
        .catch(()=>{
            toast.error("エラーが発生しました",{id: "1"})
        })
        .finally(()=>{
            setIsLoading(false);
        })

    }

    return (
        <Modal
            isOpen={questionDeleteModal.isOpen}
            onClose={questionDeleteModal.onClose}
        >
            <div>
                <Header
                    title="確認"
                    subtitle={`「${question?.title}」を本当に削除しますか?`}
                />
                <div className="mt-10">
                    <div className="flex gap-4 justify-end items-center">
                        <Button
                            label="キャンセル"
                            onClick={() => { questionDeleteModal.onClose() }}
                            type="button"
                            isSecondary
                        />
                        <Button
                            label="削除する"
                            onClick={handleDelete}
                            type="button"
                            isDanger
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default QuestionDeleteModal;
