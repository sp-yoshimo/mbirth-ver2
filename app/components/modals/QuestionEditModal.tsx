"use client"

import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import useQuestionEditModal from "@/app/hooks/useQuestionEditModal";
import { SafePost } from "@/app/types";
import Button from "../Button";
import Input from "../inputs/Input";
import Header from "../Header";
import Image from "next/image";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {TiDelete} from "react-icons/ti"
import { useRouter } from "next/navigation";

interface QuestionEditModalProps {
    question: SafePost | null
}

const QuestionEditModal: React.FC<QuestionEditModalProps> = ({
    question
}) => {

    const questionEditModal = useQuestionEditModal();
    const router = useRouter();

    enum State {
        INFO = 1,
        IMAGE = 2,
        ANSWER = 3
    }

    const [step, setStep] = useState<State>(1);
    const [isLoading, setIsLoading] = useState(false);


    const onNext = useCallback(() => {

        if (step === 3) {
            return
        } else {
            setStep((current) => current + 1)
        }
    }, [step])


    const onBack = useCallback(() => {
        if (step === 1) {
            return
        } else {
            setStep((current) => current - 1)
        }
    }, [step])


    const {
        register,
        formState: {
            errors
        },
        setValue,
        watch,
        handleSubmit
    } = useForm<FieldValues>({
        defaultValues: {
            title: question?.title,
            question: question?.question,
            answer: question?.answer,
            image: question?.image
        }
    })


    const image = watch("image");

    const ImageUpload = (result: any) => {
        setValue("image", result.info.secure_url)
    }


    const onSubmit: SubmitHandler<FieldValues> = async(data) => {


        //post process

        setIsLoading(true);

        console.log(data);
        

        toast.loading("更新中・・・", { id: "1" })

        await axios.put(`/api/question/${question?.id}`, data)
            .then(() => {
                router.refresh();
                toast.success("更新しました！", { id: "1" })
                questionEditModal.onClose()
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data ? err.response.data : "エラーが発生しました", { id: "1" })
            })
            .finally(() => {
                setIsLoading(false)
            })

    }


    let bodyContent: React.ReactNode;


    //モーダルのコンテントの切り替え
    switch (step) {
        case 1:


            bodyContent = (
                <div className="flex flex-col">
                    <div>
                        <Header
                            title="タイトル・問題文の編集"
                            subtitle="(1/3)問題の情報を編集しよう"
                        />
                    </div>
                    <div className="mt-8  flex flex-col gap-8 w-full">
                        <Input
                            label="タイトル"
                            regiter={register}
                            errors={errors}
                            id="title"
                            disabled={isLoading}
                            required
                        />
                        <Input
                            label="問題文"
                            regiter={register}
                            errors={errors}
                            id="question"
                            isBig
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="mt-5 w-full flex justify-center">
                        <div className="w-full md:w-1/2">
                            <Button
                                label="次へ"
                                type="button"
                                onClick={() => { onNext() }}
                                fullWidth
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            )


            break;

        case 2:


            bodyContent = (
                <div className="flex flex-col">
                    <div>
                        <Header
                            title="画像の選択(任意)"
                            subtitle="(2/3)図形問題などに最適"
                        />
                    </div>
                    <div className="mt-8  flex flex-col w-full">
                        <CldUploadWidget
                            onUpload={ImageUpload}
                            uploadPreset="b6ujnnl4"
                            options={{
                                maxFiles: 1
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <div
                                        onClick={() => open?.()}
                                        className="
                    relative cursor-pointer hover:opacity-70 transition border-dashed
                    border-2 p-20 border-neutral-300 flex flex-col items-center
                    gap-4 text-neutral-600
                    "
                                    >
                                        <BsFillCloudUploadFill size={50} />
                                        <div className="font-semibold text-lg whitespace-nowrap">
                                            Click to upload
                                        </div>
                                        {image && (
                                            <div className="
                             absolute inset-0 w-full h-full
                            ">
                                                <Image alt="Upload" fill style={{ objectFit: "cover" }} src={image} />
                                            </div>
                                        )}
                                    </div>
                                )
                            }}
                        </CldUploadWidget>
                    </div>
                    <div className="mt-4 mb-6">
                        <div className="flex justify-center">
                            <div
                            onClick={()=>{setValue("image", null)}}
                            className="flex items-center cursor-pointer hover:opacity-60 transform duration-150">
                                <TiDelete />
                                <p className="ml-[2px]">画像の選択を取り消す</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 w-full flex justify-center gap-5">
                        <div className="w-full md:w-1/2">
                            <Button
                                label="戻る"
                                type="button"
                                onClick={() => { onBack() }}
                                fullWidth
                                isSecondary
                                disabled={isLoading}
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <Button
                                label="次へ"
                                type="button"
                                onClick={() => { onNext() }}
                                fullWidth
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            )


            break;

        case 3:


            bodyContent = (
                <div className="flex flex-col">
                    <div>
                        <Header
                            title="解答・解説の編集"
                            subtitle="(3/3)分かりやすい解説にしよう"
                        />
                    </div>
                    <div className="mt-8  flex flex-col gap-8 w-full">
                        <Input
                            label="解答・解説"
                            regiter={register}
                            errors={errors}
                            id="answer"
                            isBig
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="mt-5 w-full flex justify-center gap-5">
                        <div className="w-full md:w-1/2">
                            <Button
                                label="戻る"
                                type="button"
                                onClick={() => { onBack() }}
                                fullWidth
                                isSecondary
                                disabled={isLoading}
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <Button
                                label="更新"
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                fullWidth
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            )


            break
    }

    return (
        <Modal
            isOpen={questionEditModal.isOpen}
            onClose={questionEditModal.onClose}
        >
            {bodyContent}
        </Modal>
    )
};

export default QuestionEditModal;
